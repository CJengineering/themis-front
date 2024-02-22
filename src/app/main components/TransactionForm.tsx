import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Select from 'react-select';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { ZodTypeAny } from 'zod';
import { createPresentationUrl } from '../features/Presentations';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { toggle, toggleSecond } from '../features/openDialog/dialogSlice';
import { fetchUser } from '../features/user/fetchUser';
import { useParams } from 'react-router-dom';

type FormFieldConfig = {
  label: string;
  validation: ZodTypeAny;
};
interface FormValues {
  amount: string;

  transactionDate: string;
}


type FormFieldsConfig = Record<keyof FormValues, FormFieldConfig>;
const formFieldsConfig: FormFieldsConfig = {
  amount: {
    label: 'Amount',
    validation: z.string().min(2).max(50),
  },

  transactionDate: {
    label: 'Transaction date',
    validation: z.string().min(2).max(50),
  },
};
const createFormSchema = (config: FormFieldsConfig) => {
  const schemaObject = {} as Record<keyof FormValues, ZodTypeAny>;

  (Object.keys(config) as Array<keyof FormValues>).forEach((key) => {
    schemaObject[key] = config[key].validation;
  });

  return z.object(schemaObject);
};

const formSchema = createFormSchema(formFieldsConfig);

interface UpdateVisaFormProps {
  id?: string;
}
export function TransactionForm({ id }: UpdateVisaFormProps) {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const url = useAppSelector(createPresentationUrl);
  const currentUser = localStorage.getItem('user-data');
  const currentUserData = JSON.parse(currentUser || '{}');
  const [countries, setCountries] = useState<
    { value: string; label: string }[]
  >([]);
  const urlUser = `${url}/user/${currentUserData.id}`;
  const isCurrentUser = `${currentUserData.id}` == userId;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
      transactionDate: '',
    },
  });
  useEffect(() => {
    if (id) {
      const fetchVisaData = async () => {
        try {
          const response = await fetch(`${url}/nothing/${id}`);
          if (!response.ok) throw new Error('Failed to fetch visa data');
          const visaData = await response.json();
          form.reset({
            amount: visaData.name,
            transactionDate: visaData.transactionDate,
          });
        } catch (error) {
          console.error('Error fetching visa data:', error);
        }
      };
      fetchVisaData();
    }
  }, [id, url, form]);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    const data = {
      ...values,
      transactionDate: format(new Date(values.transactionDate), 'yyyy-MM-dd'),
    };
    console.log('this is the data ', data);
    const endpoint = id ? `${url}/transaction/${id}` : `${url}/transaction`;
    const method = id ? 'PATCH' : 'POST';
    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (id) {
        dispatch(toggle());
        setIsLoading(true);
        toast({
          title: 'Success',
          description: 'Transaction updated successfully',

          duration: 5000,
        });
      } else {
        dispatch(toggleSecond());
        setIsLoading(true);
        toast({
          title: 'Success',
          description: 'Transaction created successfully',

          duration: 5000,
        });
      }

      //DISPATCH THE REAL DATA await dispatch<any>(fetchUser(urlUser));
      console.log('this is the response ', response);
    } catch (error) {
      console.log(error);
    }
  }
  const handleDelete = async () => {
    try {
      const response = await fetch(`${url}/test/${id}`, {
        method: 'DELETE',
      });

      if (!response.status.toString().startsWith('2')) {
        throw new Error(`Error: ${response.status}`);
      }

      toast({
        title: 'Deleted',
        description: 'Transaction has been deleted.',
      });

      dispatch(toggle());
      await dispatch<any>(fetchUser(urlUser));
    } catch (error) {
      console.error('Error deleting travel item:', error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {(Object.keys(formFieldsConfig) as Array<keyof FormValues>).map(
          (fieldName) => {
            if (fieldName === 'transactionDate') {
              return (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Transaction Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-[240px] pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value
                                ? format(new Date(field.value), 'PPP')
                                : 'Pick a date'}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) => {
                              form.setValue(
                                fieldName,
                                date ? format(date, 'yyyy-MM-dd') : ''
                              );
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            } else {
              return (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{formFieldsConfig[fieldName].label}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            }
          }
        )}
    <Button type="submit">Submit</Button>

       
          <Button
            type="button"
            style={{ backgroundColor: 'red', marginLeft: '6px' }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        
      </form>
    </Form>
  );
}

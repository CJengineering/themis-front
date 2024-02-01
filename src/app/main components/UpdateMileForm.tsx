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
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ZodTypeAny } from 'zod';
import { createPresentationUrl } from '../features/Presentations';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { toggle, toggleSecond } from '../features/openDialog/dialogSlice';
import { fetchUser } from '../features/user/fetchUser';

type FormFieldConfig = {
  label: string;
  validation: ZodTypeAny;
};
interface FormValues {
  companyName: string;
  miles: string;
}

type FormFieldsConfig = Record<keyof FormValues, FormFieldConfig>;
const formFieldsConfig: FormFieldsConfig = {
  companyName: {
    label: 'Company ',
    validation: z.string().min(2).max(50),
  },
  miles: {
    label: 'Miles',
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
interface UpdateMileFormProps {
  id?: string;
}
export function UpdateMileForm({ id }: UpdateMileFormProps) {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const url = useAppSelector(createPresentationUrl);
  const currentUser = localStorage.getItem('user-data');
  const currentUserData = JSON.parse(currentUser || '{}');
  const urlUser = `${url}/user/${currentUserData.id}`;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      miles: '',
    },
  });
  const handleDelete = async () => {
    try {
      const response = await fetch(`${url}/miles/${id}`, {
        method: 'DELETE',
      });

      if (!response.status.toString().startsWith('2')) {
        throw new Error(`Error: ${response.status}`);
      }

      toast({
        title: 'Deleted',
        description: 'miles has been deleted.',
      });

      dispatch(toggle());
      await dispatch<any>(fetchUser(urlUser));
    } catch (error) {
      console.error('Error deleting travel item:', error);
    }
  };
  useEffect(() => {
    if (id) {
      const fetchMileData = async () => {
        try {
          const response = await fetch(`${url}/miles/${id}`);
          if (!response.ok) throw new Error('Failed to fetch mile data');
          const mileData = await response.json();
          form.reset(mileData); // Assuming the API response matches the form fields
        } catch (error) {
          console.error('Error fetching mile data:', error);
        }
      };
      fetchMileData();
    }
  }, [id, url, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    const data = {
      ...values,
      userId: currentUserData.id,
    };
    console.log('this is the data ', data);
    const endpoint = id ? `${url}/miles/${id}` : `${url}/miles`;
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
          description: 'Miles updated successfully',

          duration: 5000,
        });
      } else {
        dispatch(toggleSecond());
        setIsLoading(true);
        toast({
          title: 'Success',
          description: 'Miles created successfully',

          duration: 5000,
        });
      }

      await dispatch<any>(fetchUser(urlUser));
      console.log('this is the response ', response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {(Object.keys(formFieldsConfig) as Array<keyof FormValues>).map(
          (fieldName) => {
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
        )}

        <Button type="submit">Submit</Button>
        {id && (
          <Button
            type="button"
            style={{ backgroundColor: 'red', marginLeft: '6px' }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        )}
      </form>
    </Form>
  );
}

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
import { useAppSelector } from '../features/hooks';

type FormFieldConfig = {
  label: string;
  validation: ZodTypeAny;
};
interface FormValues {
  name: string;
  startDate: string;
  endDate: string;
}

type FormFieldsConfig = Record<keyof FormValues, FormFieldConfig>;
const formFieldsConfig: FormFieldsConfig = {
  name: {
    label: 'Country',
    validation: z.string().min(2).max(50),
  },
  startDate: {
    label: 'Start Date',
    validation: z.string().min(2).max(50),
  },
  endDate: {
    label: 'End Date',
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
export function UpdateVisaForm() {
  const currentUser = localStorage.getItem('user-data');
  const url = useAppSelector(createPresentationUrl);
  const currentUserData = JSON.parse(currentUser || '{}');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      startDate: '',
      endDate: '',
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    const data = {
      ...values,
      startDate: format(new Date(values.startDate), 'yyyy-MM-dd'),
      endDate: format(new Date(values.endDate), 'yyyy-MM-dd'),
      userId: currentUserData.id,
    };
    console.log('this is the data ', data);
    try {
      const response = await fetch(`${url}/visa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

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
            if (fieldName === 'startDate') {
              return (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start date</FormLabel>
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
            } else if (fieldName === 'endDate') {
              return (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End date </FormLabel>
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
      </form>
    </Form>
  );
}

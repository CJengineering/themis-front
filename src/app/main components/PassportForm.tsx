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
  passportNumber: string;
  nationality: string;
  dateOfBirth: string;
  validFrom: string;
  expiry: string;
  file?: FileList | null;
}

type FormFieldsConfig = Record<keyof FormValues, FormFieldConfig>;
const formFieldsConfig: FormFieldsConfig = {
  passportNumber: {
    label: 'Passport Number',
    validation: z.string().min(2).max(50),
  },
  nationality: {
    label: 'Nationality',
    validation: z.string().min(2).max(50),
  },
  dateOfBirth: {
    label: 'Date of Birth',
    validation: z.string().min(2).max(50),
  },
  validFrom: {
    label: 'Valid From',
    validation: z.string().min(2).max(50),
  },
  expiry: {
    label: 'Expiry',
    validation: z.string().min(2).max(50),
  },
  file: {
    label: 'Upload your passport PDF',
    validation: z.any().optional(),
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

export function PassportForm() {
  const currentUser = localStorage.getItem('user-data');
  const url = useAppSelector(createPresentationUrl);
  const currentUserData = JSON.parse(currentUser || '{}');
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passportNumber: '',
      nationality: '',
      dateOfBirth: '',
      validFrom: '',
      expiry: '',
      file: null,
    },
  });
  const onSubmit = async (values: FormValues) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key !== 'file') {
        formData.append(key, value || '');
      }
    });
    if (values.file && values.file[0]) {
      formData.append('file', values.file[0]);
      formData.append('fileName', values.file[0].name);
    }

  
    console.log('this is the form data', formData);
    formData.append('userId', currentUserData.id.toString()); 

    try {
      const response = await fetch(`${url}/passports`, {
        method: 'POST',

        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Response data:', responseData);
      // Handle successful response
    } catch (error) {
      console.error('Error during data submission:', error);
      // Handle errors
    }
  };

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    form.setValue('file', event.target.files);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {(Object.keys(formFieldsConfig) as Array<keyof FormValues>).map(
          (fieldName) => {
            if (fieldName === 'dateOfBirth') {
              return (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Birth</FormLabel>
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
            } else if (fieldName === 'validFrom') {
              return (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Valid from </FormLabel>
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
            } else if (fieldName === 'expiry') {
              return (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Expiry</FormLabel>
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
            } else if (fieldName === 'file') {
              return (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{formFieldsConfig[fieldName].label}</FormLabel>
                      <FormControl>
                        <Input type="file" onChange={handleFileChange} />
                      </FormControl>
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

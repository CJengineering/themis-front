import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ZodTypeAny } from 'zod';
import { createPresentationUrl } from '../features/Presentations';
import { useAppSelector } from '../features/hooks';

interface FormValues {
  firstName?: string;
  lastName?: string;

  passportNumber?: string;
  passportCountry?: string;
  birthDate?: string;
  passportExpiryDate?: string;
  mobileNumber?: string;
  address?: string;


  file?: FileList | null;
}

type FormFieldConfig = {
  label: string;
  validation: ZodTypeAny;
};

type FormFieldsConfig = Record<keyof FormValues, FormFieldConfig>;

const formFieldsConfig: FormFieldsConfig = {
  firstName: {
    label: 'First Name',
    validation: z.string().min(2).max(50),
  },
  lastName: {
    label: 'Last Name',
    validation: z.string().min(2).max(50),
  },

  passportNumber: {
    label: 'Passport Number',
    validation: z.string().nullable().optional(),
  },
  passportCountry: {
    label: 'Passport Country',
    validation: z.string().optional(),
  },
  birthDate: {
    label: 'Birth Date',
    validation: z.string().optional(),
  },
  passportExpiryDate: {
    label: 'Passport Expiry Date',
    validation: z.string().optional(),
  },
  mobileNumber: {
    label: 'Mobile Number',
    validation: z.string().optional(),
  },
  address: {
    label: 'Address',
    validation: z.string().optional(),
  },


  file: {
    label: 'Upload your passport pdf',
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

export function UpdateProfileForm() {
  const currentUser = localStorage.getItem('user-data');
  const currentUserData = JSON.parse(currentUser || '{}');
  const url = useAppSelector(createPresentationUrl);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',

      passportNumber: '',
      passportCountry: '',
      birthDate: '',
      passportExpiryDate: '',
      mobileNumber: '',
      address: '',

    
      file: null,
    },
  });
  const [profile, setProfile] = useState<FormValues | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${url}/user/${currentUserData.id}`
        );
        const data = await response.json();
        setProfile(data);
        console.log('User data',data);
        form.reset({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          passportNumber: data.passportNumber || '',
          passportCountry: data.passportCountry || '',
          birthDate: data.birthDate || '',
          passportExpiryDate: data.passportExpiryDate || '',
          mobileNumber: data.mobileNumber || '',
          address: data.address || '',
        
          file: null,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);
  const onSubmit = async (values: FormValues) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
        if (key !== 'file') {
          formData.append(key, value || '');
        }
      });
      if (values.file && values.file[0]) {
        formData.append('file', values.file[0]);
      }
    
    const transformValues = {
      ...values,
      birthDate: values.birthDate || null,
      passportExpiryDate: values.passportExpiryDate || null,
      fileName: values.file?.[0].name || null,
    };
    console.log('this is the transfromed values',transformValues);
    delete transformValues.file;
    formData.append('data', JSON.stringify(transformValues));

    try {
      const response = await fetch(
        `${url}/user/${currentUserData.id}`,
        {
          method: 'PATCH',
         
          body: formData ,
        }
      );

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
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {(Object.keys(formFieldsConfig) as Array<keyof FormValues>).map(
            (fieldName) => {
              if (fieldName === 'file') {
                return (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {formFieldsConfig[fieldName].label}
                        </FormLabel>
                        <FormControl>
                          <Input type="file" onChange={handleFileChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              } else if (fieldName === 'birthDate') {
                return(
                <FormField
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Birth date</FormLabel>
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
                />)
              } else if (fieldName === 'passportExpiryDate') {
                return (
                <FormField
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Passport expiracy date</FormLabel>
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
                />)
              } else {
                return (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {formFieldsConfig[fieldName].label}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="text" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              }
            }
          )}
       
          <Button type="submit">Update profile</Button>
        </form>
      </Form>
    </div>
  );
}

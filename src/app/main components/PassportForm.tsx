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
import Select from 'react-select';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { ZodTypeAny } from 'zod';
import { createPresentationUrl } from '../features/Presentations';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { useEffect, useState } from 'react';
import {
  closeDialog,
  toggle,
  toggleSecond,
} from '../features/openDialog/dialogSlice';
import { fetchUser } from '../features/user/fetchUser';
import { useToast } from '@/components/ui/use-toast';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Selectcdn,
} from '@/components/ui/select';
import { useParams } from 'react-router-dom';

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
  passportReference?: string;
}

type FormFieldsConfig = Record<keyof FormValues, FormFieldConfig>;
const formFieldsConfig: FormFieldsConfig = {
  passportNumber: {
    label: 'Passport Number',
    validation: z.string().min(2).max(50),
  },
  nationality: {
    label: 'Nationality',
    validation: z.string().min(2),
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
    label: 'Upload passport scan',
    validation: z.any().optional(),
  },
  passportReference: {
    label: 'Passport Reference',
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
interface PassportFormProps {
  id?: string;
}

export function PassportForm({ id }: PassportFormProps) {
  const { toast } = useToast();
  const [countries, setCountries] = useState<
    { value: string; label: string }[]
  >([]);
  const { userId } = useParams();
  const isOpen = useAppSelector((state) => state.dialog.isOpen);
  console.log('this is the is open', isOpen);
  const dispatch = useAppDispatch();
  const currentUser = localStorage.getItem('user-data');
  console.log('this is the id ', id);
  const url = useAppSelector(createPresentationUrl);
  const [isLoading, setIsLoading] = useState(false);
  const currentUserData = JSON.parse(currentUser || '{}');
  const urlUser = `${url}/user/${currentUserData.id}`;
  const isCurrentUser = `${currentUserData.id}` == userId;
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
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        console.log('this is the data', data[0].name.official);
        const countryOptions = data.map((country: any) => ({
          value: country.name.official,
          label: country.name.official,
        }));
        setCountries(countryOptions);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    const fetchData = async () => {
      if (id) {
        try {
          const response = await fetch(`${url}/passports/${id}`);
          if (!response.ok) throw new Error('Failed to fetch data');
          const data = await response.json();
          form.reset({
            // Use the fetched data to populate the form
            ...data,
            dateOfBirth: data.dateOfBirth
              ? format(new Date(data.dateOfBirth), 'yyyy-MM-dd')
              : '',
            validFrom: data.validFrom
              ? format(new Date(data.validFrom), 'yyyy-MM-dd')
              : '',
            expiry: data.expiry
              ? format(new Date(data.expiry), 'yyyy-MM-dd')
              : '',
            file: null, // Assuming file handling is separate
          });
        } catch (error) {
          console.error('Error fetching passport data:', error);
        }
      }
    };

    fetchData();
    fetchCountries();
  }, [id, url, form]);
  const onSubmit = async (values: FormValues) => {
    const formData = new FormData();
    const method = id ? 'PATCH' : 'POST'; // Determine method based on presence of id
    const endpoint = id ? `${url}/passports/${id}` : `${url}/passports`;
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
      const response = await fetch(endpoint, {
        method: method,

        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Response data:', responseData);
      if (id) {
        dispatch(toggle());
        setIsLoading(true);
        toast({
          title: 'Success',
          description: 'Passport updated successfully',

          duration: 5000,
        });
      } else {
        dispatch(toggleSecond());
        setIsLoading(true);
        toast({
          title: 'Success',
          description: 'Passport created successfully',

          duration: 5000,
        });
      }

      await dispatch<any>(fetchUser(urlUser));
      // Handle successful response
    } catch (error) {
      console.error('Error during data submission:', error);
      // Handle errors
    }
  };

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    form.setValue('file', event.target.files);
  }
  const handleDelete = async () => {
    try {
      const response = await fetch(`${url}/passports/${id}`, {
        method: 'DELETE',
      });

      if (!response.status.toString().startsWith('2')) {
        throw new Error(`Error: ${response.status}`);
      }

      toast({
        title: 'Deleted',
        description: 'Passport has been deleted.',
      });

      dispatch(toggle());
      await dispatch<any>(fetchUser(urlUser));
    } catch (error) {
      console.error('Error deleting travel item:', error);
    }
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <h3>is loading</h3>
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
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
            } else if (fieldName === 'passportReference') {
              return (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{formFieldsConfig[fieldName].label}</FormLabel>
                      <FormControl>
                        {field.value ? (
                          <div className="flex items-center justify-center bg-blue-100 p-4 rounded-lg hover:bg-blue-200 transition-colors cursor-pointer">
                            <a
                              href={field.value}
                              target="_blank"
                              className="text-blue-700 font-semibold hover:text-blue-900 "
                            >
                              View Your Passport
                            </a>
                          </div>
                        ) : null}
                      </FormControl>
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
            } else if (fieldName === 'nationality') {
              return (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{formFieldsConfig[fieldName].label}</FormLabel>
                      <Controller
                        name="nationality"
                        control={form.control}
                        render={({
                          field: { onChange, onBlur, value, ref },
                        }) => (
                          <Select<{ value: string; label: string }>
                            options={countries}
                            className="col-span-3"
                            placeholder={field.value}
                            isSearchable
                            onChange={(option) =>
                              onChange(option ? option.value : '')
                            }
                            onBlur={onBlur}
                            value={countries.find((c) => c.value === value)}
                            ref={ref}
                          />
                        )}
                      />
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
      {isCurrentUser && ( <Button type="submit">Submit</Button>)}
       
        {(id ||isCurrentUser) && (
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

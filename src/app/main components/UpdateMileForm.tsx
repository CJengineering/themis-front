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
export function UpdateMileForm() {
 const url = useAppSelector(createPresentationUrl);
  const currentUser = localStorage.getItem('user-data');
  const currentUserData = JSON.parse(currentUser || '{}');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      miles: '',
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    const data = {
      ...values,
      userId: currentUserData.id,
    };
    console.log('this is the data ', data);
    try {
      const response = await fetch(`${url}/miles`, {
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
      </form>
    </Form>
  );
}

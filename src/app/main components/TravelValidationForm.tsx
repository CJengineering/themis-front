import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Selectcdn,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';

import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import Select from 'react-select';
import { Label } from '@/components/ui/label';
import DatePicker from '@/components/date-picker';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format, set } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { DialogFooter } from '@/components/ui/dialog';
import { da } from 'date-fns/locale';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { fetchTravels } from '../features/travel/fetchTravel';
import { createPresentationUrl } from '../features/Presentations';
import { CityData } from '@/interfaces';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  name: z.string().optional(),
  costOriginal: z.number().optional().nullable(),
  file: z.any().optional(),
  returnDepartureDateLeg2: z.date().optional(),
  notes: z.string().optional(),
  roundTrip: z.string().optional().nullable(),
  departureCityLeg1: z.string().optional(),
  arrivalCityLeg1: z.string().optional(),
  departureDateLeg1: z.date().optional(),
  status: z.string().optional(),
});
interface Country {
  capital: string;
}
export type TravelItem = {
  id: number;
  name: string;
  status: string | null;
  userId: number;
  tripType: string | null;
  departureDateLeg1: Date;
  departureCityLeg1: string;
  arrivalCityLeg1: string;
  arrivalDateLeg1: string | null;
  returnDepartureDateLeg2: Date | null;
  returnDepartureCityLeg2: string | null;
  returnArrivalCityLeg2: string | null;
  costOriginal: number | null;
  originalCurrency: string | null;
  costUSD: number | null;
  bookingReferenceDocument: string | null;
  notes: string | null;
  pdfLink: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    password: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
};
interface PropsTravelAuthForm {
  id: string;
}
export function TravelValidationForm(id: PropsTravelAuthForm) {
  const url = useAppSelector(createPresentationUrl);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const dispatch = useAppDispatch();
  const userString = localStorage.getItem('user-data');
  if (!userString) return null;
  const user = JSON.parse(userString);
  const fileInputRef = useRef(null);
  const [status, setStatus] = useState('');
  const idTravel = id.id;
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);
  const [travel, setTravel] = useState<TravelItem>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roundTrip: '',
      departureCityLeg1: ``,
      arrivalCityLeg1: ``,
      departureDateLeg1: new Date(),
      notes: '',
    },
  });
  useEffect(() => {
    const fetchCities = async () => {
      try {
        // Replace with the URL of the Countries States Cities Database API
        const url =
          'https://countriesnow.space/api/v0.1/countries/population/cities';
        const response = await fetch(url);
        const data: { data: CityData[] } = await response.json();

        // Adjust the mapping based on the actual response structure
        const cityOptions = data.data.map((city) => ({
          value: city.city,
          label: city.city,
        }));
        setCities(cityOptions);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    const fetchTravel = async () => {
      try {
        const response = await fetch(url + '/travel/' + idTravel);
        const data: TravelItem = await response.json();
        setTravel(data);
        form.reset({
          name: `${data.user.firstName} ${data.user.lastName}`,
          roundTrip: data.tripType,
          departureCityLeg1: data.departureCityLeg1,
          arrivalCityLeg1: data.arrivalCityLeg1,
          departureDateLeg1: new Date(`${data.departureDateLeg1}`),
          notes: data.notes || '',
          costOriginal: data.costOriginal || null,
        });
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
    fetchTravel();
  }, []);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const handleSwitchChange = () => {
    setIsRoundTrip(!isRoundTrip);
  };
  async function onSubmit(
    values: z.infer<typeof formSchema>,
    isValidation: boolean
  ) {
    if (isValidation) {
      values = { status: 'Validation', notes: values.notes };
      console.log('when true');
    }
    console.log(values);

    const formData = new FormData();

    // Append file to FormData if it exists
    if (values.file) {
      formData.append('file', values.file);
    }

    try {
      // Create an object that includes all the non-file form data
      const nonFileData = { ...values };
      delete nonFileData.file;

      // Append the non-file data as a JSON string
      formData.append('data', JSON.stringify(nonFileData));

      const response = await fetch(`${url}/travel/${id.id}`, {
        method: 'PATCH',
        body: formData, // send formData with both file and non-file data
      });

      const responseData = await response.json();
      console.log('Success:', responseData);
      setMessage('Sent for Approval');
      setMessageType('success');
      await dispatch<any>(
        fetchTravels(`${url}/travel`, {
          userId: `${user.id}`,
        })
      );
    } catch (error) {
      console.error('Error updating travel item:', error);
    }
  }

  async function onSave() {
    const values = form.getValues();
    await onSubmit(values, false);
  }

  async function onSendForValidation() {
    const values = form.getValues();
    await onSubmit(values, true);
  }
  useEffect(() => {
    form.register('file');

    return () => {
      form.unregister('file');
    };
  }, [form]);
  const handleDelete = async () => {
    try {
      const response = await fetch(`${url}/travel/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      alert('Travel deleted successfully');
      // Handle successful deletion here, like updating the UI
    } catch (error) {
      console.error('Failed to delete travel:', error);
      alert('Failed to delete travel');
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file) {
        form.setValue('file', file, { shouldValidate: true });
      }
    }
  };
  return (
    <Form {...form}>
      travel validation
      {message && (
        <div
          className={
            messageType === 'success' ? 'text-green-500' : 'text-red-500'
          }
        >
          {message}
        </div>
      )}
      <form className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Traveller</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roundTrip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Selectcdn>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="One Way" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">One Way</SelectItem>
                    <SelectItem value="dark">Round Trip</SelectItem>
                  </SelectContent>
                </Selectcdn>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid  gap-y-2">
          <Label>Status</Label>
          <Badge
            variant={
              travel?.status as
                | 'default'
                | 'secondary'
                | 'destructive'
                | 'outline'
                | 'confirmed'
                | 'inProgress'
                | 'waitingValidation'
                | 'Request'
                | 'Authentication'
                | 'Validation'
                | 'Approval'
                | 'Finalisation'
            }
            style={{ width: '50%' }}
          >
            {travel?.status}
          </Badge>
        </div>
        <FormField
          control={form.control}
          name="departureCityLeg1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>From</FormLabel>
              <FormControl>
                <div className="col-span-3 p-2 bg-gray-100 rounded">
                  {field.value || 'No city selected'}
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="arrivalCityLeg1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>To</FormLabel>
              <FormControl>
                <div className="col-span-3 p-2 bg-gray-100 rounded">
                  {field.value || 'No city selected'}
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />{' '}
        <FormField
          control={form.control}
          name="departureDateLeg1"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Departure</FormLabel>
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
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="returnDepartureDateLeg2"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Returning</FormLabel>
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
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="costOriginal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cost (GBP)</FormLabel>
              <FormControl>
                <Input
                  placeholder="0"
                  type="number"
                  {...field}
                  value={field.value || ''} // Convert null to an empty string
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field: { ref, ...field } }) => (
            <FormItem>
              <FormLabel>Reference</FormLabel>
              <FormControl>
                <Input type="file" onChange={handleFileChange} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {travel?.bookingReferenceDocument && (
          <Button style={{ backgroundColor: '#006400' }}>
            <a href={`${travel.bookingReferenceDocument}`} target="_blank">
              Download
            </a>
          </Button>
        )}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any suplementary information here."
                  className="col-span-3"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          {travel?.status === 'Authentication' ? (
            <>
              <Button style={{ backgroundColor: 'red' }} onClick={handleDelete}>
                Delete
              </Button>
              <Button
                onClick={onSendForValidation}
                type="button"
                style={{ backgroundColor: 'green' }}
              >
                Send for approval
              </Button>
            </>
          ) : (
            ''
          )}
        </DialogFooter>
      </form>
    </Form>
  );
}

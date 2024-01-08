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

import { useEffect, useState } from 'react';
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
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { loadingMessageCSS } from 'react-select/dist/declarations/src/components/Menu';
import { UserRoundIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { fetchTravels } from '../features/travel/fetchTravel';
import { DialogFooter } from '@/components/ui/dialog';
import { createPresentationUrl } from '../features/Presentations';
import { CityData } from '@/interfaces';
const formSchema = z.object({
  returnDepartureDateLeg2: z.date().optional(),
  notes: z.string().optional(),
  tripType: z.string(),
  departureCityLeg1: z.string().min(1, 'Departure City Leg 1 is required'),
  arrivalCityLeg1: z.string().min(1, 'Arrival City Leg 1 is required'),
  departureDateLeg1: z.date({ required_error: 'Departure Date  is required' }),
});
interface Country {
  capital: string;
}
export function TravelInitiateForm() {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departureCityLeg1: '',
      arrivalCityLeg1: '',
      tripType: '',
      departureDateLeg1: new Date(),
      notes: '',
    },
  });
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);
  useEffect(() => {
    const fetchCities = async () => {
      try {
        // Replace with the URL of the Countries States Cities Database API
        const url = 'https://countriesnow.space/api/v0.1/countries/population/cities';
        const response = await fetch(url);
        const data: { data: CityData[] }  = await response.json();
    
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

    fetchCities();
  }, []);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const url = useAppSelector(createPresentationUrl)
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    let nametrip = '';
    let userId = 0;
    let status = 'Request';
    const userData = localStorage.getItem('user-data');
    if (userData) {
      const user = JSON.parse(userData);
      const firstName = user.firstName;
      const lastName = user.lastName;
      const email = user.email;
      userId = user.id;
      nametrip = ` ${values.departureCityLeg1} ${values.arrivalCityLeg1} |${firstName} ${lastName} |`;
    } else {
      console.log('User data not found in localStorage');
    }
    const submissionData = {
      ...values,
      userId: userId,
      name: nametrip,
      status: status,
    };
    try {
      const response = await fetch(`${url}/travel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
        console.log(submissionData);
      }

      // Handle the response (e.g., show success message)
      const responseData = await response.json();
      console.log('Success:', responseData);
      setMessage(
        'Your trip request was sent! You can close or add another trip'
      );
      setMessageType('success');

      // You can add more logic here for success case
      await dispatch<any>(
        fetchTravels(`${url}/travel`, { userId: `${userId}` })
      );
      form.reset({
        // Provide the initial values or leave empty to reset to defaultValues
        departureCityLeg1: '',
        arrivalCityLeg1: '',
        tripType: '',
        departureDateLeg1: new Date(),
        notes: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      // You can add more logic here for error handling
    }
  }
  const transitionStyle = {
    transition: 'opacity 0.5s ease-in-out, max-height 1s ease-in-out',
    maxHeight: isRoundTrip ? '500px' : '0', // Adjust max height as needed
    opacity: isRoundTrip ? 1 : 0,
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {message && (
          <div
            className={
              messageType === 'success' ? 'text-green-500' : 'text-red-500'
            }
          >
            {message}
          </div>
        )}
        <FormField
          control={form.control}
          name="tripType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Selectcdn onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type trip" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="One Way">One Way</SelectItem>
                  <SelectItem value="Round Trip">Round Trip</SelectItem>
                 
                </SelectContent>
              </Selectcdn>
            
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="departureCityLeg1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>From</FormLabel>
              <FormControl>
                <Controller
                  name="departureCityLeg1"
                  control={form.control}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Select<{ value: string; label: string }>
                      options={cities}
                      className="col-span-3"
                      placeholder="Select a city"
                      isSearchable
                      onChange={(option) =>
                        onChange(option ? option.value : '')
                      }
                      onBlur={onBlur}
                      value={cities.find((c) => c.value === value)}
                      ref={ref}
                    />
                  )}
                />
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
                <Controller
                  name="arrivalCityLeg1"
                  control={form.control}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Select<{ value: string; label: string }>
                      options={cities}
                      className="col-span-3"
                      placeholder="Select a city"
                      isSearchable
                      onChange={(option) =>
                        onChange(option ? option.value : '')
                      }
                      onBlur={onBlur}
                      value={cities.find((c) => c.value === value)}
                      ref={ref}
                    />
                  )}
                />
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
         
        <Button type="submit">Submit Trip Request</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

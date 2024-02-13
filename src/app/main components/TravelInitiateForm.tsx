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

import { useCallback, useEffect, useState } from 'react';
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
import { useToast } from '@/components/ui/use-toast';
const formSchema = z.object({
  returnDepartureDateLeg2: z.date().optional(),
  notes: z.string().optional(),
  tripType: z.string(),
  purpose: z.string().optional(),
  departureCityLeg1: z.string().min(1, 'Departure City Leg 1 is required'),
  arrivalCityLeg1: z.string().min(1, 'Arrival City Leg 1 is required'),
  departureDateLeg1: z.date().refine((date) => date >= new Date(), {
    message: 'Departure Date cannot be in the past',
  }),
});
const enhancedFormSchema = formSchema.refine(
  (data) => {
    if (data.returnDepartureDateLeg2) {
      return data.returnDepartureDateLeg2 >= data.departureDateLeg1;
    }

    return true;
  },
  {
    message: 'Return Departure Date must not be before the Departure Date',
    path: ['returnDepartureDateLeg2'],
  }
);
interface Country {
  capital: string;
}
interface TravelInitFromProps {
  onClose: () => void;
}
export function TravelInitiateForm({ onClose }: TravelInitFromProps) {
  const [tripType, setTripType] = useState('Round Trip');
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const dispatch = useAppDispatch();
  function getFirstThreeConsonants(cityName: string) {
    let consonants = cityName.match(/[^aeiou]/gi) || [];

    return consonants.length < 3
      ? consonants.join('').toUpperCase()
      : consonants.slice(0, 3).join('').toUpperCase();
  }
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(true);
  const fetchCities2 = async (query: string) => {
    try {
      const url = `https://api.api-ninjas.com/v1/city?name=${query}&limit=30`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-Api-Key': 'Kh9wcmGqloUhMtGKrwf9Fg==3ehfaiVh85GDvwfd',
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      // Assuming the response is an array of cities
      const cityOptions = data.map((city: any) => ({
        value: city.name,
        label: city.name,
      }));
      setCities(cityOptions);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };
  function getMonthAbbreviation(date: Date): string {
    return format(date, 'MMM').toUpperCase();
  }
  function debounce<F extends (...args: any[]) => void>(
    func: F,
    waitFor: number
  ) {
    let timeoutId: NodeJS.Timeout;

    return function (...args: Parameters<F>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), waitFor);
    } as F;
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(enhancedFormSchema),
    defaultValues: {
      departureCityLeg1: '',
      purpose: '',
      arrivalCityLeg1: '',
      tripType: 'Round Trip',
      departureDateLeg1: new Date(),
      notes: '',
    },
  });
  const debouncedFetchCities = useCallback(
    debounce((query: string) => fetchCities2(query), 200),
    []
  );

  useEffect(() => {
    if (searchTerm) {
      debouncedFetchCities(searchTerm);
    }
  }, [searchTerm, debouncedFetchCities]);
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);

  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const url = useAppSelector(createPresentationUrl);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setShowForm(false);
    setMessage('Submitting form...');
    setMessageType('success');
    let nametrip = '';
    let userId = 0;
    let userRole = 'traveller';
    let status = 'Request';
    const userData = localStorage.getItem('user-data');
    if (userData) {
      const user = JSON.parse(userData);
      const firstName = user.firstName;
      const lastName = user.lastName;
      userRole = user.role;
      const email = user.email;
      userId = user.id;

      const monthAbbreviation = getMonthAbbreviation(values.departureDateLeg1);
      const departureConsonants = getFirstThreeConsonants(
        values.departureCityLeg1
      );
      const arrivalConsonants = getFirstThreeConsonants(values.arrivalCityLeg1);
      nametrip = ` ${departureConsonants} <-> ${arrivalConsonants} | ${firstName[0]}${lastName[0]}`;
    } else {
      console.log('User data not found in localStorage');
    }

    const submissionData = {
      ...values,
      departureDateLeg1: values.departureDateLeg1
        ? toUTCDate(values.departureDateLeg1).toISOString()
        : null,
      returnDepartureDateLeg2: values.returnDepartureDateLeg2
        ? toUTCDate(values.returnDepartureDateLeg2).toISOString()
        : null,
      userId: userId,
      name: nametrip,
      status: status,
    };
    console.log('this is submission data',submissionData);
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
      setMessage('Your trip request was sent! ');
      setMessageType('success');

      // You can add more logic here for success case
      await dispatch<any>(
        fetchTravels(`${url}/travel`, {
          userId: `${userId}`,
          userRole: `${userRole}`,
        })
      );
      form.reset({
        // Provide the initial values or leave empty to reset to defaultValues
        departureCityLeg1: '',
        arrivalCityLeg1: '',
        tripType: '',
        purpose: '',
        departureDateLeg1: new Date(),
        notes: '',
      });
      onClose();
      toast({
        title: 'Sent for authentication',
        description: 'Your trip request was sent! ',
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
  function toUTCDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return new Date(Date.UTC(year, month, day));
  }
  return (
    <Form {...form}>
      {!showForm ? (
        <div
          className={
            messageType === 'success' ? 'text-green-500' : 'text-red-500'
          }
        >
          {message}
        </div>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6 p-2 max-h-[50vh]  overflow-y-auto h-">
            <FormField
              control={form.control}
              name="tripType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Selectcdn
                    onValueChange={(value) => {
                      setTripType(value);
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Round Trip" />
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
                          onInputChange={(inputValue) =>
                            setSearchTerm(inputValue)
                          }
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
                          onInputChange={(inputValue) =>
                            setSearchTerm(inputValue)
                          }
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
            /><FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purpose</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Purpose of the trip..."
                    className="col-span-3"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          /> 
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
            {tripType === 'Round Trip' && (
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
            )}
            {/* <FormField
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
            /> */}
          </div>

          <DialogFooter>
            <Button type="submit" style={{ backgroundColor: 'green' }}>
              Request
            </Button>
          </DialogFooter>
        </form>
      )}
    </Form>
  );
}

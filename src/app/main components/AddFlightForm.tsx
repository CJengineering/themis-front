import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
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
import Select from 'react-select';
import { Textarea } from '@/components/ui/textarea';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCallback, useEffect, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { DialogFooter } from '@/components/ui/dialog';
import { cn, getFirstThreeConsonants } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

const flightSchema = z.object({
  tripType: z.string(),
  departureCity: z.string().min(1, 'Departure City is required'),
  roundTrip: z.boolean(),
  arrivalCity: z.string().min(1, 'Arrival City is required'),
  departureDate: z.date().refine((date) => date >= new Date(), {
    message: 'Departure Date cannot be in the past',
  }),
  returnDepartureDate: z.date().optional(),
});



const formSchema = z.object({
  returnDepartureDateLeg2: z.date().optional(),
  notes: z.string().optional(),
  tripType: z.string(),
  purpose: z.string().min(1, 'Purpose is required'),
  departureCityLeg1: z.string().min(1, 'Departure City Leg 1 is required'),
  arrivalCityLeg1: z.string().min(1, 'Arrival City Leg 1 is required'),
  departureDateLeg1: z.date().refine((date) => date >= new Date(), {
    message: 'Departure Date cannot be in the past',
  }),
  flights: z.array(flightSchema).optional(),

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

interface TripRequestFormProps {
  onClose: () => void;
}

export function AddFlightForm({ onClose }: TripRequestFormProps) {
  const { toast } = useToast();
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const form = useForm<z.infer<typeof enhancedFormSchema>>({
    resolver: zodResolver(enhancedFormSchema),
    defaultValues: {
      departureCityLeg1: '',
      purpose: '',
      arrivalCityLeg1: '',
      tripType: 'Round Trip',
      departureDateLeg1: new Date(),
      notes: '',
      flights: [],
   
    },
  });




  const debouncedFetchCities = useCallback(
    debounce((query: string) => fetchCities(query), 200),
    []
  );

  useEffect(() => {
    if (searchTerm) {
      debouncedFetchCities(searchTerm);
    }
  }, [searchTerm, debouncedFetchCities]);

  async function fetchCities(query: string) {
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

      const cityOptions = data.map((city: any) => ({
        value: city.name,
        label: city.name,
      }));
      setCities(cityOptions);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  }

  async function onSubmit(values: z.infer<typeof enhancedFormSchema>) {
    const firstFlight = values.flights?.[0];
    const lastFlight =
      form.watch('tripType') === 'Round Trip'
        ? values.flights?.[values.flights.length - 1]
        : undefined;

    let departureCity = '';
    let arrivalCity = '';
    let departureDate: Date | undefined = undefined;
    let returnDate: Date | undefined = undefined;

    if (firstFlight) {
      departureCity = firstFlight.departureCity;
      arrivalCity = firstFlight.arrivalCity;
      departureDate = firstFlight.departureDate;
    }

    if (lastFlight && form.watch('tripType') === 'Round Trip') {
      returnDate = lastFlight.returnDepartureDate || lastFlight.departureDate;
    }

    let nametrip = '';
    const firstName = 'tim';
    const lastName = 'donov';
    const departureConsonants = getFirstThreeConsonants(values.departureCityLeg1);
    const arrivalConsonants = getFirstThreeConsonants(values.arrivalCityLeg1);
    nametrip = `${departureConsonants} <-> ${arrivalConsonants} | ${firstName[0]}${lastName[0]}`;

    const submissionData = {
      fieldData: {
        name: nametrip,
        subject: values.purpose,
        status: 'Request',
        relatedProgramme: values.notes, // Assuming 'notes' is related to a programme
        departureDate: values.departureDateLeg1?.toISOString(),
        returnDate: values.returnDepartureDateLeg2?.toISOString(),
        cityStart: departureCity,
        cityEnd: arrivalCity,
        transitionalCities: [], // Assuming there are no transitional cities in this example
        daysOfStay: [], // Assuming this needs to be filled in based on business logic
        flights: values.flights?.map((flight, index) => ({
          id: index + 1, // Assuming we're generating a simple ID for flights
          cityDeparture: flight.departureCity,
          cityArrival: flight.arrivalCity,
          departureDate: flight.departureDate?.toISOString(),
          roundTrip: flight.roundTrip,
          returnDate: flight.returnDepartureDate?.toISOString(),
        })),
       
      
      },
      userId: '1', // Using '1' as the fixed userId for testing
      status: 'Request',
    };

    console.log('this is submission data', submissionData);

    try {
      const response = await fetch('http://localhost:3000/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: 'Trip Request Submitted',
          description: `Your trip request has been sent to the server with ID: ${result.id}`,
        });
        onClose();
      } else {
        toast({
          title: 'Error Submitting Trip Request',
          description: 'There was an issue submitting your trip request. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error submitting trip request:', error);
      toast({
        title: 'Error Submitting Trip Request',
        description: 'There was an issue submitting your trip request. Please try again.',
        variant: 'destructive',
      });
    }
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6 p-2 max-h-[50vh] overflow-y-auto">
          <FormField
            control={form.control}
            name="tripType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Selectcdn
                  onValueChange={(value) => {
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
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purpose</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Purpose of the trip..." />
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
          
        </div>
        <DialogFooter>
          <Button type="submit" style={{ backgroundColor: 'green' }}>
            Submit Request
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

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
import { useForm, Controller } from 'react-hook-form';
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
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../features/hooks';
import { createPresentationUrl2 } from '../features/Presentations';

const formSchema = z.object({
  notes: z.string().optional(),
  tripType: z.string(),
  trainClass: z.string().optional(),
  departureCityLeg1: z.string().min(1, 'Departure City Leg 1 is required'),
  arrivalCityLeg1: z.string().min(1, 'Arrival City Leg 1 is required'),
  departureDateLeg1: z.date().refine((date) => date >= new Date(), {
    message: 'Departure Date cannot be in the past',
  }),
  returnDepartureDateLeg2: z.date().optional(),
});

const enhancedFormSchema = formSchema.refine(
  (data) => {
    if (data.tripType === 'Round Trip' && data.returnDepartureDateLeg2) {
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

export function AddTrainForm() {
  const { toast } = useToast();
  const { tripId } = useParams();
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const form = useForm<z.infer<typeof enhancedFormSchema>>({
    resolver: zodResolver(enhancedFormSchema),
    defaultValues: {
      departureCityLeg1: '',
      trainClass: '2nd Class',
      arrivalCityLeg1: '',
      tripType: 'Round Trip',
      departureDateLeg1: new Date(),
      returnDepartureDateLeg2: undefined,
      notes: '',
    },
  });
  const url2 = useAppSelector(createPresentationUrl2);
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
    const Train = {
      departureDate: values.departureDateLeg1,
      cityDeparture: values.departureCityLeg1,
      cityArrival: values.arrivalCityLeg1,
      roundTrip: values.tripType === 'Round Trip',
      trainClass: values.trainClass,
      returnDate:
        values.tripType === 'Round Trip'
          ? values.returnDepartureDateLeg2
          : undefined,
    };

    const submissionData = {
      action: {
        type: 'addTrain',
        data: Train,
      },
      fieldData: {},
    };

    console.log('this is submission data', submissionData);
    try {
      const response = await fetch(`${url2}/trips/${tripId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      let result;

      // Try parsing the response, catch any errors that might occur
      try {
        result = await response.json();
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        throw new Error('Failed to parse response JSON');
      }

      console.log('Response Body:', result);

      if (response.ok) {
        toast({
          title: 'Train Added',
          description: `Your Train was added `,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        const errorText = await response.text();
        console.log('Error Response Text:', errorText);
        toast({
          title: 'Error saving your Train',
          description: `There was an issue submitting your Train`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      // Log the actual error that triggered the catch block
      console.error('Error submitting trip request:', error);
      toast({
        title: 'Error Submitting Trip Request',
        description:
          'There was an issue submitting your trip request. Please try again.',
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
    <div>
      <h2 className="text-xl font-bold">Add your Train </h2>

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
              name="trainClass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class</FormLabel>
                  <Selectcdn
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="2nd Class">Economy</SelectItem>
                      <SelectItem value="1st Class">Business</SelectItem>
                    </SelectContent>
                  </Selectcdn>
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
            {form.watch('tripType') === 'Round Trip' && (
              <FormField
                control={form.control}
                name="returnDepartureDateLeg2"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Return</FormLabel>
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
          </div>
          <DialogFooter>
            <Button type="submit" style={{ backgroundColor: 'green' }}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Select from 'react-select';
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
import { format, set } from 'date-fns';
import { DialogFooter } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { useParams } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { calculateConvertedAmounts, fetchConversionRates } from '@/lib/utils';
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Selectcdn } from '@/components/ui/select';
import { useAppSelector } from '../features/hooks';
import { createPresentationUrl2 } from '../features/Presentations';

// Currency options
const currencyOptions = ["USD", "EUR", "GBP", "SAR"] as const;

const accommodationSchema = z.object({
  city: z.string().min(1, 'City is required'),
  hotelName: z.string().optional(),
  checkIn: z.date().refine((date) => date >= new Date(), {
    message: 'Check-in Date cannot be in the past',
  }),
  checkOut: z.date().optional(),
  pricePerNight: z.preprocess(
    (value) => parseFloat(value as string),
    z.number().min(0, "Price per night must be positive")
  ),
  currency: z.enum(currencyOptions),
});

interface AccommodationFormProps {
  action: string;
  accommodationId: number;
  city: string;
  hotelName: string;
  checkIn: Date;
  checkOut?: Date;
  pricePerNight: number;
}

export function AccommodationFormV2({
  action,
  accommodationId,
  city,
  hotelName,
  pricePerNight,
  checkIn,
  checkOut,
}: AccommodationFormProps) {
  const { tripId } = useParams();
  const [submited, setSubmited] = useState(false);
  const { toast } = useToast();
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const url2 = useAppSelector(createPresentationUrl2);
  const form = useForm<z.infer<typeof accommodationSchema>>({
    resolver: zodResolver(accommodationSchema),
    defaultValues: {
      city: city,
      hotelName: hotelName,
      checkIn: checkIn,
      checkOut: checkOut,
      pricePerNight: pricePerNight,
      currency: "USD",
    },
  });
  console.log('acrtion', action);

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
  const trimmedAction = action.trim();
  const actionStatus = trimmedAction === 'updateAccommodation' ? 'updateAccommodation' : 'addAccommodation';

  async function onSubmit(values: z.infer<typeof accommodationSchema>) {
    try {
      let totalPrice = 0; 
      if (values.checkIn && values.checkOut) {
        const checkInDate = new Date(values.checkIn);
        const checkOutDate = new Date(values.checkOut);
        const numberOfNights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
        totalPrice = numberOfNights * values.pricePerNight;
        console.log('Number of nights:', numberOfNights);
      } else {
        console.log('Check-in or check-out date is missing');
      }
      const conversionRates = await fetchConversionRates();
      const convertedAmounts = calculateConvertedAmounts(
        totalPrice,
        values.currency,
        conversionRates
      );

      const accommodationData = {
        city: values.city,
        hotelName: values.hotelName,
        startDate: values.checkIn.toISOString(),
        leaveDate: values.checkOut?.toISOString(),
        pricePerNight: values.pricePerNight,
        currency: values.currency,
        priceInUSD: convertedAmounts.priceInUSD,
        priceInEUR: convertedAmounts.priceInEUR,
        priceInSAR: convertedAmounts.priceInSAR,
        pricepriceInGBP: convertedAmounts.priceInGBP,
        bookingImageUrl: '',
      };

      const updateAccommodationData = {
        ...accommodationData,
        accommodationId: accommodationId,
      };
   

      const submissionData =
        action == 'updateAccommodation'
          ? {
              action: { type: 'updateAccommodation', data: updateAccommodationData },
              fieldData: {},
            }
          : {
              action: { type: 'addAccommodation', data: accommodationData },
              fieldData: {},
            };

      console.log('this is submission data', submissionData);

      const response = await fetch(`${url2}/trips/${tripId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: 'Accommodation Saved',
          description: `Your accommodation details have been saved `,
          
        })
        setSubmited(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
 
      } else {
        toast({
          title: 'Error Saving Accommodation',
          description:
            'There was an issue saving your accommodation details. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error saving accommodation:', error);
      toast({
        title: 'Error Saving Accommodation',
        description:
          'There was an issue saving your accommodation details. Please try again.',
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
  const handleSubmit = async () => {
    const submissionData = {
      action: { type: 'removeAccommodation', data: { accommodationId: accommodationId } },
      fieldData: {},
    };

    console.log('Submitting data:', submissionData);

    try {
      const response = await fetch(`${url2}/trips/${tripId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        toast({
          title: 'Accomodation deleted',
          description: `Your accomodation has been successfully deleted.`,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
     
        // Reload the page after successful deletion
      } else {
        const errorData = await response.json();
        console.error(
          'Failed to delete flight:',
          response.statusText,
          errorData
        );
      }
    } catch (error) {
      console.error('Error deleting flight:', error);
    }
  };
  
  return (
    <div >
      <h3 className='text-xl font-bold'>{actionStatus ==='updateAccommodation'? 'Update' : 'Add'} your accomodation</h3>
         {submited? <p>Accomodation saved</p>: <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-6 p-2 max-h-[50vh] overflow-y-auto">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Controller
                          name="city"
                          control={form.control}
                          render={({
                            field: { onChange, onBlur, value, ref },
                          }) => (
                            <Select<{ value: string; label: string }>
                              options={cities}
                              placeholder={field.value}
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
                  name="hotelName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hotel Name (optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Hotel Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="checkIn"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Check In</FormLabel>
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
                  name="checkOut"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Check Out</FormLabel>
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
                  name="pricePerNight"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Price Per Night</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Enter price per night"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Currency</FormLabel>
                      <Controller
                        name="currency"
                        control={form.control}
                        render={({ field }) => (
                          <Selectcdn
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-[240px]">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                              {currencyOptions.map((currency) => (
                                <SelectItem key={currency} value={currency}>
                                  {currency}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Selectcdn>
                        )}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit" style={{ backgroundColor: 'green' }}>
                  Save 
                </Button>
                {actionStatus === 'updateAccommodation' && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleSubmit}
                  >
                    Delete
                  </Button>
                )}
              </DialogFooter>
            </form>
          </Form>}

         
  
    </div>
  );
}

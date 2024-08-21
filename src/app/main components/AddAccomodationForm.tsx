import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '@/components/ui/form';
  import { Button } from '@/components/ui/button';
  import { useForm, Controller } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  import * as z from 'zod';
  import { Calendar } from '@/components/ui/calendar';
  import {
    Popover,
    PopoverTrigger,
    PopoverContent,
  } from '@/components/ui/popover';
  import { format } from 'date-fns';
  import Select from 'react-select';
  import { Input } from '@/components/ui/input';
  import { useState, useCallback, useEffect } from 'react';
  import { useToast } from '@/components/ui/use-toast';
  
  // Define the schema for a single accommodation
  const accommodationSchema = z.object({
    city: z.string().min(1, 'City is required'),
    hotelName: z.string().optional(),
    checkIn: z.date().refine((date) => date >= new Date(), {
      message: 'Check in Date cannot be in the past',
    }),
    checkOut: z.date().optional(),
  });
  
  // Define the types based on the schema
  type AccommodationFormValues = z.infer<typeof accommodationSchema>;
  
  export function AddAccommodationForm({ onSubmit }: any) {
    const { toast } = useToast();
    const [cities, setCities] = useState<{ value: string; label: string }[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
  
    const form = useForm<AccommodationFormValues>({
      resolver: zodResolver(accommodationSchema),
      defaultValues: {
        city: '',
        hotelName: '',
        checkIn: new Date(),
        checkOut: undefined,
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
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Controller
                      name="city"
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
                          className="w-[240px] pl-3 text-left font-normal"
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
                          className="w-[240px] pl-3 text-left font-normal"
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
          <Button type="submit" style={{ backgroundColor: 'green' }}>
            Submit Accommodation
          </Button>
        </form>
      </Form>
    );
  }
  
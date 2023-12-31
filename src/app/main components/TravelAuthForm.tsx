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
import { DialogFooter } from '@/components/ui/dialog';
const formSchema = z.object({
  name: z.string(),
  cost: z.number(),
  file: z.string(),
  returnDepartureDateLeg2: z.date(),
  notes: z.string().optional(),
  roundTrip: z.string(),
  departureCityLeg1: z.string().min(1, 'Departure City Leg 1 is required'),
  arrivalCityLeg1: z.string().min(1, 'Arrival City Leg 1 is required'),
  departureDateLeg1: z.date({ required_error: 'Departure Date  is required' }),
});
interface Country {
  capital: string;
}
export function TravelAuthForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roundTrip: "One Way",
      departureCityLeg1: '',
      arrivalCityLeg1: '',
      departureDateLeg1: new Date(),
      notes: '',
    },
  });
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('https://restcountries.com/v2/all');
        const data: Country[] = await response.json();
        const cityOptions = data.map((country) => ({
          value: country.capital,
          label: country.capital,
        }));
        setCities(cityOptions);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const handleSwitchChange = () => {
    setIsRoundTrip(!isRoundTrip);
  };
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  const transitionStyle = {
    transition: 'opacity 0.5s ease-in-out, max-height 1s ease-in-out',
    maxHeight: isRoundTrip ? '500px' : '0', // Adjust max height as needed
    opacity: isRoundTrip ? 1 : 0,
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Traveller</FormLabel>
              <FormControl>
                <Input placeholder="Nathanael Daudrich" {...field} />
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
                  <SelectTrigger  className="w-[180px]">
                    <SelectValue  placeholder="One Way"/>
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
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
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
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
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
          name="cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cost (GBP)</FormLabel>
              <FormControl>
                <Input placeholder="0" type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reference</FormLabel>
              <FormControl>
                <Input type="file" {...field} />
              </FormControl>
           
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
        <Button type="submit" style={{backgroundColor:'blue', marginRight:'12px'}}>Save</Button>
        <Button type="submit"style={{backgroundColor:'green'}}>Send for validation</Button>

        </DialogFooter>
      </form>
    </Form>
  );
}

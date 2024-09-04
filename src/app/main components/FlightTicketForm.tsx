import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
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
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Selectcdn,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { calculateConvertedAmounts, fetchConversionRates } from '@/lib/utils';
import { useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import {
  createPresentationSingleTrip,
  createPresentationUrl2,
} from '../features/Presentations';
import { useAppSelector } from '../features/hooks';

// Currency options
const currencyOptions = ['USD', 'EUR', 'GBP', 'SAR'] as const;

const flightTicketSchema = z.object({
  departureDate: z
    .date()
    .refine((val) => val !== null, { message: 'Departure date is required.' }),
  returnDate: z
    .date()
    .refine((val) => val !== null, { message: 'Return date is required.' }),
  price: z
    .preprocess(
      (value) => parseFloat(value as string),
      z.number().min(0, 'Price must be greater than 0')
    )
    .optional(),
  currency: z.enum(currencyOptions).optional(),
});
interface FlightTicketFormProps {
  flightId: number;
}
export function FlightTicketForm({ flightId }: FlightTicketFormProps) {
  const url2 = useAppSelector(createPresentationUrl2);
  const trip = useAppSelector(createPresentationSingleTrip);
  const { tripId } = useParams();
  const { toast } = useToast();
  const currentFlight = trip.flights.find((flight) => flight.id === flightId);
  const initialDepartureDate = currentFlight?.departureDate
    ? new Date(currentFlight.departureDate)
    : new Date();
  const initialReturnDate = currentFlight?.returnDate
    ? new Date(currentFlight.returnDate)
    : new Date();
  const iniialCost = currentFlight?.priceInUSD ? currentFlight.priceInUSD : 0;
  const form = useForm({
    resolver: zodResolver(flightTicketSchema),
    defaultValues: {
      departureDate: initialDepartureDate,
      returnDate: initialReturnDate,
      price: iniialCost,
      currency: 'USD',
    },
  });

  const onSubmit = async (data: any) => {
    console.log('Form submitted');

    const departureDate = format(data.departureDate, 'yyyy-MM-dd');
    const returnDate = format(data.returnDate, 'yyyy-MM-dd');

    try {
      const conversionRates = await fetchConversionRates();
      const convertedAmounts = calculateConvertedAmounts(
        data.price,
        data.currency,
        conversionRates
      );
      console.log('Converted amounts:', convertedAmounts);

      const submissionData = {
        action: {
          type: 'updateFlight',
          data: {
            flightId: flightId, // The specific flight ID to be updated
            departureDate,
            returnDate,
            price: data.price,
            currency: data.currency,
            priceInUSD: convertedAmounts.priceInUSD,
            priceInEUR: convertedAmounts.priceInEUR,
            priceInSAR: convertedAmounts.priceInSAR,
            priceInGBP: convertedAmounts.priceInGBP,
          },
        },
        fieldData: {},
      };

      console.log('Submission data', submissionData);

      const response = await fetch(`${url2}/trips/${tripId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        console.log('Flight updated successfully');
        toast({
          title: 'Flight updated',
          description: 'The flight details have been successfully updated.',
        });
        setTimeout(() => {
          window.location.reload();
        }, 800);
      } else {
        console.error('Failed to update flight');
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      toast({
        title: 'Error updating flight',
        description:
          'There was an issue updating the flight. Please try again.',
        variant: 'destructive',
      });
    }
  };
  const handleSubmit = async () => {
    const submissionData = {
      action: { type: 'removeFlight', data: { flightId: flightId } },
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
          title: 'Flight deleted',
          description: `Your flight has been successfully deleted.`,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        console.log('Flight deleted successfully');
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
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-2">
        <AccordionTrigger>Modify Flight Tickets</AccordionTrigger>
        <AccordionContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="departureDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Departure Date</FormLabel>
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
                name="returnDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Return Date</FormLabel>
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
                name="price"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Enter price"
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-start space-x-1 ">
                <Button type="submit" className='bg-blue-600'>Save</Button>
                <Button
                  type="button"
                  className="bg-red-600"
                  onClick={handleSubmit}
                >
                  <i className="material-icons">delete</i> Delete Flight
                </Button>
              </div>
            </form>
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

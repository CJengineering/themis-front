import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const flightTicketSchema = z.object({
  departureDate: z.date().refine((val) => val !== null, { message: "Departure date is required." }),
  returnDate: z.date().refine((val) => val !== null, { message: "Arrival date is required." }),
});

export function FlightTicketForm() {
  const tripId = '05892c1a-fda0-42ac-9a1e-e8fb06b30aa6';
  const form = useForm({
    resolver: zodResolver(flightTicketSchema),
    defaultValues: {
      departureDate: new Date(),
      returnDate: new Date(),
    },
  });

  const onSubmit = async (data: any) => {
    console.log('Form submitted');  // Log to check if onSubmit is triggered
    const departureDate = format(data.departureDate, 'yyyy-MM-dd');
    const returnDate = format(data.returnDate, 'yyyy-MM-dd');

    const submissionData = {
      action: {
        type: 'updateFlight',
        data: {
          flightId: 1, // The specific flight ID to be updated
          departureDate,
          returnDate,
        },
      },
      fieldData: { /* Existing fieldData structure here */ },
    };
    console.log(submissionData);

    try {
      const response = await fetch(`http://localhost:3000/trips/${tripId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        console.log('Flight updated successfully');
      } else {
        console.error('Failed to update flight');
      }
    } catch (error) {
      console.error('Error updating flight:', error);
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
                    <FormLabel>Arrival Date</FormLabel>
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
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}


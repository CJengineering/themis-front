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
import { toast, useToast } from '@/components/ui/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { createPresentationUrl2 } from '../features/Presentations';
import { useAppSelector } from '../features/hooks';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  tripType: z.string(),
  purpose: z.string().min(1, 'Purpose is required'),
  name: z.string().min(1, 'Name is required'),
});

interface TripRequestFormProps {
  onClose: () => void;
}

export function TripSaveForm({ onClose }: TripRequestFormProps) {
  const { toast } = useToast();
  const urlThemis = 'http://localhost:4200';
  const url = useAppSelector(createPresentationUrl2);
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      purpose: '',
      tripType: 'Round Trip',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // First Flight

    let nametrip = '';
    let userId = '';
    let userRole = 'traveller';
    let status = 'Saved';
    let firstName = '';
    let lastName = '';
    let email = '';

    const userData = localStorage.getItem('user-data');
    if (userData) {
      const user = JSON.parse(userData);
      firstName = user.firstName;
      lastName = user.lastName;
      userRole = user.role;
      email = user.email;
      userId = String(user.id);
    } else {
      console.log('no user data');
    }

    const submissionData = {
      fieldData: {
        name: values.name,
        purpose: values.purpose,
        userId: userId,
        userRole: userRole,
        firstName: firstName,
        lastName: lastName,
        email: email,

        status: 'Saved',
        flights: [],
        accommodations: [],
        expenses: [],
        documents: [],
      },
    };
    console.log('this is submission data', submissionData);

    try {
      const response = await fetch(`${url}/trips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: 'Trip Created',
          description: `Your trip was saved successfully !`,
        });
        setTimeout(() => {
            navigate(`/trip/${result.id}`);
           
          }, 1000);
        onClose();
      } else {
        toast({
          title: 'Error Submitting Trip ',
          description:
            'There was an issue submitting your trip. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error submitting trip :', error);
      toast({
        title: 'Error Submitting Trip',
        description:
          'There was an issue submitting your trip . Please try again.',
        variant: 'destructive',
      });
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Save your new trip</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6 p-2 max-h-[50vh] overflow-y-auto">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name of the trip..." />
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
          </div>
          <DialogFooter>
            <Button type="submit" style={{ backgroundColor: 'green' }}>
              Save trip
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}

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

import { useEffect, useRef, useState } from 'react';
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
import { format, set } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { DialogFooter } from '@/components/ui/dialog';
import { da } from 'date-fns/locale';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { fetchTravels } from '../features/travel/fetchTravel';
import { createPresentationUrl } from '../features/Presentations';
import { CityData } from '@/interfaces';
import { Badge } from '@/components/ui/badge';
import { StatusInput, mapStatusToOutput } from '../travel/columns';
import { useToast } from '@/components/ui/use-toast';
import { toggle } from '../features/openDialog/dialogSlice';
const formSchema = z.object({
  name: z.string().optional(),
  costOriginal: z.string().optional(),
  file: z.any().optional(),
  returnDepartureDateLeg2: z.date().optional(),
  notes: z.string().optional(),
  roundTrip: z.string().optional(),
  departureCityLeg1: z.string().optional(),
  arrivalCityLeg1: z.string().optional(),
  departureDateLeg1: z.date().optional(),
  status: z.string().optional(),
});
interface Country {
  capital: string;
}
export type TravelItem = {
  id: number;
  name: string;
  status: string | null;
  userId: number;
  tripType: string | null;
  departureDateLeg1: Date;
  departureCityLeg1: string;
  arrivalCityLeg1: string;
  arrivalDateLeg1: string | null;
  returnDepartureDateLeg2: Date | null;
  returnDepartureCityLeg2: string | null;
  returnArrivalCityLeg2: string | null;
  costOriginal: number | null;
  originalCurrency: string | null;
  costUSD: number | null;
  bookingReferenceDocument: string | null;
  notes: string;
  pdfLink: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    password: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
};
interface PropsTravelAuthForm {
  id: string;
}
export function TravelApprovalForm(id: PropsTravelAuthForm) {
  const userString = localStorage.getItem('user-data');
  if (!userString) return null;
  const { toast } = useToast();
  const user = JSON.parse(userString);
  const url = useAppSelector(createPresentationUrl);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const dispatch = useAppDispatch();
  const fileInputRef = useRef(null);
  const [status, setStatus] = useState('');
  const [showForm, setShowForm] = useState(true);
  const idTravel = id.id;
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);
  const [travel, setTravel] = useState<TravelItem>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roundTrip: 'One Way',
      departureCityLeg1: `Kabul`,
      arrivalCityLeg1: ``,
      departureDateLeg1: new Date(),
      notes: '',
    },
  });
  useEffect(() => {
    const fetchTravel = async () => {
      try {
        const response = await fetch(`${url}/travel/` + idTravel);
        const data: TravelItem = await response.json();
        setTravel(data);
        form.reset({
          name: `${data.user.firstName} ${data.user.lastName}`,
          roundTrip: 'One Way',
          departureCityLeg1: data.departureCityLeg1,
          arrivalCityLeg1: data.arrivalCityLeg1,
          departureDateLeg1: new Date(`${data.departureDateLeg1}`),
          notes: data.notes,
        });
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    if (showForm) {
      fetchTravel();
    }
  }, []);

  const handleDelete = async () => {
    setShowForm(false);
    try {
      const response = await fetch(`${url}/travel/${id.id}`, {
        method: 'DELETE',
      });
      console.log('Delete response:', response);
  
      if (!response.status.toString().startsWith('2')) {
        throw new Error(`Error: ${response.status}`);
      }
  
      toast({
        title: 'Deleted',
        description: 'Your travel has been deleted.',
      });
  
      // Dispatching at the end to ensure all above operations complete
      dispatch(toggle());
  
      // Fetch travels after updating the state
      await dispatch<any>(
        fetchTravels(`${url}/travel`, {
          userRole: `${user.role}`,
        })
      );
    } catch (error) {
      console.error('Error deleting travel item:', error);
      toast({
        title: 'Error',
        description: 'Error occurred while deleting travel.',
      });
    }
  };
  
  async function onSubmit(
    values: z.infer<typeof formSchema>,
    isValidation: boolean
  ) {
    if (isValidation) {
      values = { status: 'Approval' };
      console.log('when true');
    }
    if (!isValidation) {
      values = { status: 'Request' };
      console.log('when false');
    }
    console.log(values);
    setShowForm(false);
    setMessageType('success');
    setMessage('Sending...');
    const formData = new FormData();

    try {
      // Create an object that includes all the non-file form data
      const nonFileData = { ...values };
      delete nonFileData.file;

      // Append the non-file data as a JSON string
      formData.append('data', JSON.stringify(nonFileData));

      const response = await fetch(`${url}/travel/${id.id}`, {
        method: 'PATCH',
        body: formData, // send formData with both file and non-file data
      });

      const responseData = await response.json();
      console.log('Success:', responseData);
      setMessage('You have approved the trip !');
      toast({
        title: 'Approved',
        description: 'Your travel has been approved.',
      });
      if (!isValidation) {
        setMessage('You have declined the trip !');
        toast({ title: 'Declined', description: 'travel has been declined.' });
      }

      setMessageType('success');
      dispatch(toggle());
      // You can add more logic here for success case
      await dispatch<any>(
        fetchTravels(`${url}/travel/admin`, {
          userRole: `${user.role}`,
        })
      );
    } catch (error) {
      console.error('Error updating travel item:', error);
    }
  }

  async function onSave() {
    const values = form.getValues();
    await onSubmit(values, false);
  }

  async function onSendForFinalisation() {
    const values = form.getValues();
    await onSubmit(values, true);
  }
  async function onSendForDecline() {
    const values = form.getValues();
    await onSubmit(values, false);
  }
  useEffect(() => {
    form.register('file');

    return () => {
      form.unregister('file');
    };
  }, [form]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file) {
        form.setValue('file', file, { shouldValidate: true });
      }
    }
  };
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
        <form className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Traveller</FormLabel>
                <FormControl>
                  <div className="col-span-3 p-2 bg-gray-100 rounded">
                    {field.value || 'No city selected'}
                  </div>
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
                  <div className="col-span-3 p-2 bg-gray-100 rounded">
                    {field.value || 'No city selected'}
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid  gap-y-2">
            <Label>Status</Label>
            <Badge
              variant={
                travel?.status as
                  | 'default'
                  | 'secondary'
                  | 'destructive'
                  | 'outline'
                  | 'confirmed'
                  | 'inProgress'
                  | 'waitingValidation'
                  | 'Request'
                  | 'Authentication'
                  | 'Validation'
                  | 'Approval'
                  | 'Finalisation'
              }
              style={{ width: '50%' }}
            >
              {mapStatusToOutput(travel?.status as StatusInput)}
            </Badge>
          </div>
          <FormField
            control={form.control}
            name="departureCityLeg1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From</FormLabel>
                <FormControl>
                  <div className="col-span-3 p-2 bg-gray-100 rounded">
                    {field.value || 'No city selected'}
                  </div>
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
                  <div className="col-span-3 p-2 bg-gray-100 rounded">
                    {field.value || 'No city selected'}
                  </div>
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
                <div className="col-span-3 p-2 bg-gray-100 rounded">
                  {field.value
                    ? format(field.value, 'PPP')
                    : 'No date selected'}
                </div>

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
                      <div className="col-span-3 p-2 bg-gray-100 rounded">
                        {field.value
                          ? format(field.value, 'PPP')
                          : 'No date selected'}
                      </div>
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
            name="costOriginal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cost (GBP)</FormLabel>
                <FormControl>
                  <div className="col-span-3 p-2 bg-gray-100 rounded">
                    {field.value || 'No city selected'}
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={({ field: { ref, ...field } }) => (
              <FormItem>
                <FormMessage />
              </FormItem>
            )}
          />
          {travel?.bookingReferenceDocument && (
            <Button style={{ backgroundColor: '#006400' }}>
              <a href={`${travel.bookingReferenceDocument}`} target="_blank">
                Download
              </a>
            </Button>
          )}
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  {travel?.status === 'Aproval' ? (
                    <Textarea
                      placeholder="Add any suplementary information here."
                      className="col-span-3"
                      {...field}
                    />
                  ) : (
                    <div className="col-span-3 p-2 bg-gray-100 rounded">
                      {field.value || 'No notes'}
                    </div>
                  )}
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            {travel?.status === 'Validation' ? (
              <>
                <Button
                  onClick={onSendForFinalisation}
                  type="button"
                  style={{ backgroundColor: 'green' }}
                >
                  Approve
                </Button>
                <Button
                  onClick={onSendForDecline}
                  type="button"
                  style={{ backgroundColor: 'brown' }}
                >
                  Decline
                </Button>
              </>
            ) : (
              ''
            )}

            <Button style={{ backgroundColor: 'red' }} onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </form>
      )}
    </Form>
  );
}

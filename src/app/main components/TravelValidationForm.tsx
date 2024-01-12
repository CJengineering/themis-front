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

import { toggle } from '../features/openDialog/dialogSlice';
import { useToast } from '@/components/ui/use-toast';
import { StatusInput, mapStatusToOutput } from '../travel/columns';

const formSchema = z.object({
  name: z.string().optional(),
  costOriginal: z.number().optional().nullable(),
  file: z.any().optional(),
  returnDepartureDateLeg2: z.date().optional(),
  notes: z.string().optional(),
  roundTrip: z.string().optional().nullable(),
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
  notes: string | null;
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
export function TravelValidationForm(id: PropsTravelAuthForm) {
  const { toast } = useToast();
  const url = useAppSelector(createPresentationUrl);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const dispatch = useAppDispatch();
  const userString = localStorage.getItem('user-data');
  if (!userString) return null;
  const user = JSON.parse(userString);
  const fileInputRef = useRef(null);
  const [status, setStatus] = useState('');
  const idTravel = id.id;
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);
  const [travel, setTravel] = useState<TravelItem>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roundTrip: '',
      departureCityLeg1: ``,
      arrivalCityLeg1: ``,
      departureDateLeg1: new Date(),
      notes: '',
    },
  });
  useEffect(() => {
    const fetchTravel = async () => {
      try {
        const response = await fetch(url + '/travel/' + idTravel);
        const data: TravelItem = await response.json();
        setTravel(data);
        form.reset({
          name: `${data.user.firstName} ${data.user.lastName}`,
          roundTrip: data.tripType,
          departureCityLeg1: data.departureCityLeg1,
          arrivalCityLeg1: data.arrivalCityLeg1,
          departureDateLeg1: new Date(`${data.departureDateLeg1}`),
          notes: data.notes || '',
          costOriginal: data.costOriginal || null,
        });
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    if (showForm) {
      fetchTravel();
    }
  }, []);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const handleSwitchChange = () => {
    setIsRoundTrip(!isRoundTrip);
  };
  async function onSubmit(
    values: z.infer<typeof formSchema>,
    isValidation: boolean
  ) {
    if (isValidation) {
      values = { status: 'Validation', notes: values.notes };
      console.log('when true');
    }
    console.log(values);
    setShowForm(false);
    setMessageType('success');
    setMessage('Sent for approval');
    const formData = new FormData();

    // Append file to FormData if it exists
    if (values.file) {
      formData.append('file', values.file);
    }

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
      toast({
        title: 'Validated',
        description: 'Your travel has been sent for approval',
      });

      dispatch(toggle());
      setMessage('Sent for Approval');
      setMessageType('success');
      await dispatch<any>(
        fetchTravels(`${url}/travel`, {
          userId: `${user.id}`,
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

  async function onSendForValidation() {
    const values = form.getValues();
    await onSubmit(values, true);
  }
  useEffect(() => {
    form.register('file');

    return () => {
      form.unregister('file');
    };
  }, [form]);
  const handleDelete = async () => {
    setShowForm(false);
    try {
      const response = await fetch(`${url}/travel/${id.id}`, {
        method: 'DELETE',
      });

      if (!response.status.toString().startsWith('2')) {
        throw new Error(`Error: ${response.status}`);
      }

      toast({
        title: 'Deleted',
        description: 'Your travel has been deleted.',
      });

      dispatch(toggle());
      await dispatch<any>(
        fetchTravels(`${url}/travel`, {
          userId: `${user.id}`,
        })
      );
    } catch (error) {
      console.error('Error deleting travel item:', error);
    }
  };

  const [showForm, setShowForm] = useState(true);
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
        <form className="space-y-6">
          <div className="space-y-6 pr-2 max-h-[50vh]  overflow-y-auto h-">
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
                      {field.value || 'One way'}
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" block ">
              <Label>Status</Label>
              <div className="">
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
                >
                  {mapStatusToOutput(travel?.status as StatusInput)}
                </Badge>
              </div>
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
                  {field.value && (
                    <>
                      <FormLabel>Returning</FormLabel>
                      <div className="col-span-3 p-2 bg-gray-100 rounded">
                        {field.value ? format(field.value, 'PPP') : 'One way'}
                      </div>
                      <FormMessage />
                    </>
                  )}
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
                      {field.value || '0'}
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field: { ref, ...field } }) => <FormItem></FormItem>}
            />
            {travel?.bookingReferenceDocument && (
              <div className="block">
                <FormLabel>Reference</FormLabel>
                <div className="mt-2">
                  <Button style={{ backgroundColor: '#006400' }}>
                    <a
                      href={`${travel.bookingReferenceDocument}`}
                      target="_blank"
                    >
                      Download
                    </a>
                  </Button>
                </div>
              </div>
            )}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    {travel?.status === 'Validation' ? (
                      <Textarea
                        placeholder="Add any suplementary information here."
                        className="col-span-3"
                        {...field}
                      />
                    ) : (
                      <div className="col-span-3 p-2 bg-gray-100 rounded">
                        {field.value || 'No notes'}{' '}
                      </div>
                    )}
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <DialogFooter>
            {travel?.status !== 'Finalisation' ? (
              <>
                <Button
                  style={{ backgroundColor: 'red' }}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                {travel?.status === 'Authentication' && (
                  <Button
                    onClick={onSendForValidation}
                    type="button"
                    style={{ backgroundColor: 'green' }}
                  >
                    Send for approval
                  </Button>
                )}
              </>
            ) : (
              ''
            )}
          </DialogFooter>
        </form>
      )}
    </Form>
  );
}

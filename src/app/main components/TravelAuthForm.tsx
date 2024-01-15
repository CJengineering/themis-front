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
import { url } from 'inspector';
import { CityData } from '@/interfaces';
import { Badge } from '@/components/ui/badge';
import { StatusInput, mapStatusToOutput } from '../travel/columns';
import { toggle } from '../features/openDialog/dialogSlice';
import { useToast } from '@/components/ui/use-toast';
const formSchema = z.object({
  name: z.string().optional(),
  costOriginal: z.number().nullable().optional(),
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
export function TravelAuthForm(id: PropsTravelAuthForm) {
  const url = useAppSelector(createPresentationUrl);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const userString = localStorage.getItem('user-data');
  if (!userString) return null;

  const user = JSON.parse(userString);
  const fileInputRef = useRef(null);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
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
        const response = await fetch(`${url}/travel/` + idTravel);
        const data: TravelItem = await response.json();
        setTravel(data);
        form.reset({
          name: `${data.user.firstName} ${data.user.lastName}`,
          roundTrip: `${data.tripType}`,
          departureCityLeg1: data.departureCityLeg1,
          arrivalCityLeg1: data.arrivalCityLeg1,
          departureDateLeg1: new Date(`${data.departureDateLeg1}`),
          notes: data.notes,
          costOriginal: data.costOriginal,
          returnDepartureDateLeg2: new Date(`${data.returnDepartureDateLeg2}`)
        });
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    if (showForm) {
      fetchTravel();
    }
  }, []);

  const [showForm, setShowForm] = useState(true);

  async function onSubmit(
    values: z.infer<typeof formSchema>,
    isValidation: string
  ) {
    if (isValidation === 'validation') {
      values = { ...values, status: 'Authentication' };
      console.log('when authentication');
    }
    if (isValidation === 'approval') {
      values = { ...values, status: 'Approval' };
      console.log('when approval');
    }
    if (isValidation === 'finalisation') {
      values = { ...values, status: 'Finalisation' };
      console.log('when approval');
    }
    setShowForm(false);
    setMessage('Sending...');
    setMessageType('success');
    console.log(values);

    if (values.departureDateLeg1) {
      values = {
        ...values,
        departureDateLeg1: toUTCDate(values.departureDateLeg1),
      };
    }
    if (values.returnDepartureDateLeg2) {
      values = {
        ...values,
        returnDepartureDateLeg2: toUTCDate(values.returnDepartureDateLeg2),
      };
    }
    const formData = new FormData();
    console.log('files ', values?.file);
    // Append file to FormData if it exists
    if (values.file) {
      formData.append('file', values.file);
    }

    try {
      // Create an object that includes all the non-file form data
      const nonFileData = { ...values };
      delete nonFileData.file;
      delete nonFileData.name;
      delete nonFileData.departureCityLeg1;
      delete nonFileData.arrivalCityLeg1;

      // Append the non-file data as a JSON string
      formData.append('data', JSON.stringify(nonFileData));

      const response = await fetch(`${url}/travel/${id.id}`, {
        method: 'PATCH',
        body: formData, // send formData with both file and non-file data
      });

      const responseData = await response.json();
      console.log('Success:', responseData);

      if (isValidation === 'approval') {
        setMessage(
          'Your changes have been saved. The travel request has been sent for finalised'
        );
        toast({
          title: 'Sent for Approval',
          description:
            'Your changes have been saved. The travel request has been sent for finalised',
        });
      } else if (isValidation === 'validation') {
        setMessage(
          'Your changes have been saved. The travel request has been sent for validation.'
        );
        toast({
          title: 'Sent for Validation',
          description: 'Your changes have been saved and sent for validation',
        });
      } else {
        setMessage('Your changes have been saved.');
        toast({
          title: 'Saved',
          description: 'Your changes have been saved.',
        });
      }

      setMessageType('success');

      dispatch(toggle());

      await dispatch<any>(
        fetchTravels(`${url}/travel`, {
          userRole: `${user.role}`,
        })
      );
    } catch (error) {
      console.error('Error updating travel item:', error);
    }
  }
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
        description: 'Travel has been deleted.',
      });

      dispatch(toggle());
      await dispatch<any>(
        fetchTravels(`${url}/travel`, {
          userRole: `${user.role}`,
        })
      );
    } catch (error) {
      console.error('Error deleting travel item:', error);
    }
  };
  function toUTCDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return new Date(Date.UTC(year, month, day));
  }
  async function onSave() {
    const values = form.getValues();
    await onSubmit(values, 'save');
  }
  async function onSendForApproval() {
    const values = form.getValues();
    await onSubmit(values, 'approval');
  }
  async function onSendForValidation() {
    const values = form.getValues();
    await onSubmit(values, 'validation');
  }
  async function onSendForFinal() {
    const values = form.getValues();
    await onSubmit(values, 'finalisation');
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
        <form className="space-y-6 ">
          <div className="space-y-6 p-2 max-h-[50vh]  overflow-y-auto h-">
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
                  {travel?.status !== 'Approval' &&
                  travel?.status !== 'Finalisation' ? (
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
                  ) : (
                    <div className="col-span-3 p-2 bg-gray-100 rounded">
                      {field.value
                        ? format(field.value, 'PPP')
                        : 'No date selected'}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            {travel?.tripType === 'Round Trip' && (
              <FormField
                control={form.control}
                name="returnDepartureDateLeg2"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Return</FormLabel>
                    {travel?.status !== 'Approval' &&
                    travel?.status !== 'Finalisation' ? (
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
                    ) : (
                      <div className="col-span-3 p-2 bg-gray-100 rounded">
                        {field.value ? format(field.value, 'PPP') : 'One way'}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="costOriginal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost (GBP)</FormLabel>
                  <FormControl>
                    {travel?.status !== 'Approval' &&
                    travel?.status !== 'Finalisation' ? (
                      <Input
                        {...field}
                        value={field.value !== null ? String(field.value) : ''}
                        type="number"
                      />
                    ) : (
                      <div className="col-span-3 p-2 bg-gray-100 rounded">
                        {field.value || 'No city selected'}
                      </div>
                    )}
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
                  {travel?.status !== 'Finalisation' && (
                    <>
                      <FormLabel>Reference</FormLabel>
                      <FormControl>
                        <Input type="file" onChange={handleFileChange} />
                      </FormControl>
                    </>
                  )}
                </FormItem>
              )}
            />
            {travel?.bookingReferenceDocument && (
              <div className="block">
                {travel?.status === 'Finalisation' && (
                  <FormLabel>Reference</FormLabel>
                )}

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
                    {travel?.status !== 'Approval' &&
                    travel?.status !== 'Finalisation' ? (
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
          </div>

          <DialogFooter>
            {travel?.status === 'Request' && (
              <>
                <Button
                  onClick={onSendForValidation}
                  type="button"
                  style={{ backgroundColor: 'green' }}
                >
                  Send for validation
                </Button>
              </>
            )}
            {travel?.status !== 'Finalisation' && (
              <>
                <Button
                  style={{ backgroundColor: 'red' }}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button
                  type="button"
                  onClick={onSave}
                  style={{ backgroundColor: 'blue', marginRight: '6px' }}
                >
                  Save
                </Button>
              </>
            )}
            {travel?.status === 'Approval' && (
              <>
                <Button
                  onClick={onSendForFinal}
                  type="button"
                  style={{ backgroundColor: 'green' }}
                >
                  Finalise the trip
                </Button>
              </>
            )}
          </DialogFooter>
        </form>
      )}
    </Form>
  );
}

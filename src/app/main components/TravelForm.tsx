import { cities } from '@/cities';
import DatePicker from '@/components/date-picker';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { is } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { FormGeneral } from './FormGeneral';
import { TravelInitiateForm } from './TravelInitiateForm';
import { Card } from '@/components/ui/card';
import StatusSteps from './StatusSteps';
interface Country {
  capital: string;
}
interface TravelFormData {
  departureCityLeg1: string;
  arrivalCityLeg1: string;
  departureDateLeg1: string;
}
const travelSchema = zod.object({
  departureCityLeg1: zod
    .string()
    .nonempty({ message: 'Departure city is required' }),
  arrivalCityLeg1: zod
    .string()
    .nonempty({ message: 'Arrival city is required' }),
  departureDateLeg1: zod
    .string()
    .nonempty({ message: 'Departure date is required' }),
});

export function TravelForm() {
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
  const handleTripTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsRoundTrip(event.target.value === 'roundTrip');
  };
  const transitionStyle = {
    transition: 'opacity 0.5s ease-in-out, max-height 1s ease-in-out',
    maxHeight: isRoundTrip ? '500px' : '0', // Adjust max height as needed
    opacity: isRoundTrip ? 1 : 0,
  };
  const form = useForm<TravelFormData>({
    resolver: zodResolver(travelSchema),
    defaultValues: {
      departureCityLeg1: '',
      arrivalCityLeg1: '',
      departureDateLeg1: '',
    },
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = async (data: TravelFormData) => {
    console.log('Form data:', data);
    try {
      const response = await fetch('https://themis-e4f6j5kdsq-ew.a.run.app/travel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Handle success
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Travel</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Trip</DialogTitle>
          <DialogDescription>
           Please follow the steps below to complete this trip
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-8 gap-4 py-4">
          <div className="col-span-2">
            <StatusSteps statusTravel={"Request"}></StatusSteps>
          </div>
          <div className="col-span-6">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Request
            </h4>
            <TravelInitiateForm />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

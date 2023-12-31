import { cities } from '@/cities';
import DatePicker from '@/components/date-picker';
import { InputCustom } from '@/components/ui/InputCustom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { Textarea } from '@/components/ui/textarea';
import { is } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import StatusSteps from './StatusSteps';
import { TravelAuthForm } from './TravelAuthForm';
interface Country {
  capital: string;
  // Include other fields from the API response if needed
}
export function TravelAdminForm() {
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
  return (
    <>
      <div className="grid grid-cols-8 gap-4 py-4">
        <div className="col-span-2">
          <StatusSteps></StatusSteps>
        </div>
        <div className="col-span-6">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Authentication
          </h4>
          <TravelAuthForm />
        </div>
      </div>
    </>
  );
}

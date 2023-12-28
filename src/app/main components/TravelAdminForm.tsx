import { cities } from '@/cities';
import DatePicker from '@/components/date-picker';
import { InputCustom } from '@/components/ui/InputCustom';
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
      <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="departureCity" className="text-right">
            Traveller
          </Label>
          <Input value='Nathanael ' id="departureCity" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="departureCity" className="text-right">
            Trip
          </Label>
          <Input value='Paris -Tunis ' id="departureCity" className="col-span-3" />
        </div>
        {/* Departure City */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="departureCity" className="text-right">
            Dep. City
          </Label>
          <InputCustom id="departureCity" initialText="Paris" className="col-span-3" />
        </div>

        {/* Arrival City */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="arrivalCity" className="text-right">
            Arr. City
          </Label>
          <InputCustom id="departureCity" initialText="Tunis" className="col-span-3" />

        </div>

        {/* Departure Date */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="departureDate" className="text-right">
            Dep. Date
          </Label>
          <Input id="departureDate" type="date" className="col-span-3" />
        </div>

        {/* Return Date */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="returnDate" className="text-right">
            Ret. Date
          </Label>
          <Input id="returnDate" type="date" className="col-span-3" />
        </div>

        

        {/* Cost in USD */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="costUSD" className="text-right">
            Cost GBP
          </Label>
          <Input id="costUSD" type="number" className="col-span-3" />
        </div>

        {/* Booking Reference Document */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="bookingReferenceDocument" className="text-right">
            Booking Ref.
          </Label>
          <Input id="picture" type="file"  className="col-span-3"/>
        </div>

        {/* Notes */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="notes" className="text-right">
            Notes
          </Label>
         <Textarea placeholder="Type your message here."  className="col-span-3"/>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
   
        <Button type="submit" style={{backgroundColor:'green'}}>Submit Changes</Button>
      </DialogFooter>
    </>
  );
}

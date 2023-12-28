import { cities } from '@/cities';
import DatePicker from '@/components/date-picker';
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
      {/* ...existing fields... */}

{/* Requested Departure Date */}

{/* Departure Date Leg 1 */}
<div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="departureDateLeg1" className="text-right">
    Dep. Date L1
  </Label>
  <Input id="departureDateLeg1" className="col-span-3" />
</div>

{/* Departure City Leg 1 */}
<div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="departureCityLeg1" className="text-right">
    Dep. City L1
  </Label>
  <Input id="departureCityLeg1" className="col-span-3" />
</div>

{/* Arrival City Leg 1 */}
<div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="arrivalCityLeg1" className="text-right">
    Arr. City L1
  </Label>
  <Input id="arrivalCityLeg1" className="col-span-3" />
</div>

{/* Arrival Date Leg 1 */}
<div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="arrivalDateLeg1" className="text-right">
    Arr. Date L1
  </Label>
  <Input id="arrivalDateLeg1" className="col-span-3" />
</div>

{/* Return Departure Date Leg 2 */}
<div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="returnDepartureDateLeg2" className="text-right">
    Ret. Dep. Date L2
  </Label>
  <Input id="returnDepartureDateLeg2" className="col-span-3" />
</div>

{/* Return Departure City Leg 2 */}
<div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="returnDepartureCityLeg2" className="text-right">
    Ret. Dep. City L2
  </Label>
  <Input id="returnDepartureCityLeg2" className="col-span-3" />
</div>

{/* Return Arrival City Leg 2 */}
<div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="returnArrivalCityLeg2" className="text-right">
    Ret. Arr. City L2
  </Label>
  <Input id="returnArrivalCityLeg2" className="col-span-3" />
</div>

{/* Cost Original */}
<div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="costOriginal" className="text-right">
    Orig. Cost
  </Label>
  <Input id="costOriginal" type="number" className="col-span-3" />
</div>

{/* Original Currency */}
<div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="originalCurrency" className="text-right">
    Orig. Currency
  </Label>
  <Input id="originalCurrency" className="col-span-3" />
</div>

{/* Cost in USD */}
<div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="costUSD" className="text-right">
    Cost USD
  </Label>
  <Input id="costUSD" type="number" className="col-span-3" />
</div>

{/* Booking Reference Document */}
<div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="bookingReferenceDocument" className="text-right">
    Booking Ref.
  </Label>
  <Input id="bookingReferenceDocument" className="col-span-3" />
</div>

{/* Notes */}
<div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="notes" className="text-right">
    Notes
  </Label>
  <Input id="notes" className="col-span-3" />
</div>

        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
   </>
  );
}

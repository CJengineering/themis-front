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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Travel</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Travel</DialogTitle>
          <DialogDescription>
            Please fill all the fields below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tripType" className="text-right">
              Round Trip
            </Label>
            <Switch
          checked={isRoundTrip}
          onCheckedChange={handleSwitchChange}
          className="col-span-3"
        />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="departureCityLeg1" className="text-right">
              Dep City L1
            </Label>
            <Select
              options={cities}
              className="col-span-3"
              placeholder="Select a city"
              isSearchable
              name="departureCityLeg1"
            />
          </div>

          {/* Arrival City Leg 1 */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="arrivalCityLeg1" className="text-right">
              Arr City L1
            </Label>
            <Select
              options={cities}
              className="col-span-3"
              placeholder="Select a city"
              isSearchable
              name="departureCityLeg1"
            />
          </div>

          {/* Arrival Date Leg 1 */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="arrivalDateLeg1" className="text-right">
              Arr Date L1
            </Label>
            <DatePicker id="arrivalDateLeg1" className="col-span-3" />
          </div>
          <div style={transitionStyle}>
            {isRoundTrip && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="returnArrivalCityLeg2" className="text-right">
                    Return Arr City L2
                  </Label>
                  <Select
              options={cities}
              className="col-span-3"
              placeholder="Select a city"
              isSearchable
              name="departureCityLeg1"
            />
                </div>
                <div className="grid grid-cols-4 items-center gap-4 mt-4">
                  <Label
                    htmlFor="returnDepartureDateLeg2"
                    className="text-right"
                  >
                    Return Dep Date L2
                  </Label>
                  <DatePicker
                    id="returnDepartureDateLeg2"
                    className="col-span-3"
                  />
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

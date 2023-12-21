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

export function TravelForm() {
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
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="departureCityLeg1" className="text-right">
              Dep City L1
            </Label>
            <Input id="departureCityLeg1" className="col-span-3" />
          </div>

          {/* Arrival City Leg 1 */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="arrivalCityLeg1" className="text-right">
              Arr City L1
            </Label>
            <Input id="arrivalCityLeg1" className="col-span-3" />
          </div>

          {/* Arrival Date Leg 1 */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="arrivalDateLeg1" className="text-right">
              Arr Date L1
            </Label>
            <DatePicker id="arrivalDateLeg1" className="col-span-3" />
          </div>

          {/* Return Departure Date Leg 2 */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="returnDepartureDateLeg2" className="text-right">
              Return Dep Date L2
            </Label>
            <DatePicker id="returnDepartureDateLeg2" className="col-span-3" />
          </div>

          {/* Return Departure City Leg 2 */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="returnDepartureCityLeg2" className="text-right">
              Return Dep City L2
            </Label>
            <Input id="returnDepartureCityLeg2" className="col-span-3" />
          </div>

          {/* Return Arrival City Leg 2 */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="returnArrivalCityLeg2" className="text-right">
              Return Arr City L2
            </Label>
            <Input id="returnArrivalCityLeg2" className="col-span-3" />
          </div>

          {/* Cost Original */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="costOriginal" className="text-right">
              C.O.
            </Label>
            <Input id="costOriginal" type="number" className="col-span-3" />
          </div>

          {/* Original Currency */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="originalCurrency" className="text-right">
              O. Currency
            </Label>
            <Input id="originalCurrency" className="col-span-3" />
          </div>

          {/* Cost in USD */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="costUSD" className="text-right">
              C. USD
            </Label>
            <Input id="costUSD" type="number" className="col-span-3" />
          </div>

          {/* Booking Reference Document */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bookingReferenceDocument" className="text-right">
              Booking Ref{' '}
            </Label>
            <Input id="bookingReferenceDocument" className="col-span-3" />
          </div>

          {/* Notes (Optional) */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="text-right">
              Notes
            </Label>
            <Input id="notes" className="col-span-3" />
          </div>

          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

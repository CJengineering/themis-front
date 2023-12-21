import DatePicker from "@/components/date-picker"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AccomodationForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Accommodation</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Accommodation</DialogTitle>
          <DialogDescription>
            Please fill all the fields below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" className="col-span-3" />
          </div>

          {/* Status */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">Status</Label>
            <Input id="status" className="col-span-3" />
          </div>

          {/* Check-In Date */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="checkInDate" className="text-right">Check-In Date</Label>
            <DatePicker id="checkInDate" className="col-span-3" />
          </div>

          {/* Check-Out Date */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="checkOutDate" className="text-right">Check-Out Date</Label>
            <DatePicker id="checkOutDate" className="col-span-3" />
          </div>

          {/* City */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="city" className="text-right">City</Label>
            <Input id="city" className="col-span-3" />
          </div>

          {/* Total Cost */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="totalCost" className="text-right">Total Cost</Label>
            <Input id="totalCost" type="number" className="col-span-3" />
          </div>

          {/* Booking Confirmation Document */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bookingConfirmationDocument" className="text-right">Booking Confirmation </Label>
            <Input id="bookingConfirmationDocument" className="col-span-3" />
          </div>

          <DialogFooter>
            <Button type="submit">Save </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

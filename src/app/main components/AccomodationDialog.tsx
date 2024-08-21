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
import { Separator } from '@/components/ui/separator';
import { AccommodationFormV2 } from './AccomodationFormV2';

interface AccommodationDialogProps {
  hotelName: string;
  roomType: string;
  occupancy: string;
  nights: number;
  checkInDate: string;
  checkInTime: string;
  checkOutDate: string;
  checkOutTime: string;
  title: string;
  description: string;
}

export function AccommodationDialog({
  hotelName,
  roomType,
  occupancy,
  nights,
  checkInDate,
  checkInTime,
  checkOutDate,
  checkOutTime,
  title,
  description,
}: AccommodationDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="text-sm text-muted-foreground cursor-pointer hover:opacity-30">
          Details
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{hotelName}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {/* Header */}
        <div className="grid grid-cols-7">
          <div className="col-span-5">
            <div className="font-semibold">{roomType}</div>
            <div>{occupancy}</div>
          </div>
          <div className="col-span-2 flex my-2 items-center justify-end">
            <i className="material-icons">hotel</i>
            <div className="ml-2">{nights} nights</div>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="grid grid-cols-12">
          <div className="col-span-6">
            <div className="text-xs text-muted-foreground">Check-in</div>
            <div className="font-semibold text-xl">{checkInDate}</div>
            <div className="text-xs text-muted-foreground">From {checkInTime}</div>
          </div>
          <div className="col-span-6">
            <div className="text-xs text-muted-foreground">Check-out</div>
            <div className="font-semibold text-xl">{checkOutDate}</div>
            <div className="text-xs text-muted-foreground">Before {checkOutTime}</div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button">
            <i className="material-icons">print</i> Print Booking
          </Button>
        </DialogFooter>
        <AccommodationFormV2/>
      </DialogContent>
    </Dialog>
  );
}

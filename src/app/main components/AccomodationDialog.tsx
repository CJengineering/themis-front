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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface AccommodationDialogProps {
  accommodationId: number;
  hotelName: string;
  pricePerNight: number;

  checkInDate: string;

  checkOutDate: string;

  city: string;
}

export function AccommodationDialog({
  accommodationId,
  hotelName,
  pricePerNight,

  checkInDate,

  checkOutDate,

  city,
}: AccommodationDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="text-sm text-blue-700 underline cursor-pointer hover:opacity-30">
          see details
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{hotelName}</DialogTitle>
          <DialogDescription>{city}</DialogDescription>
        </DialogHeader>
        {/* Header */}

        <div className="grid grid-cols-7"></div>
        <Separator className="my-2" />
        <div className="grid grid-cols-12">
          <div className="col-span-6">
            <div className="text-xs text-muted-foreground">Check-in</div>
            <div className="font-semibold text-xl">{checkInDate}</div>
          </div>
          <div className="col-span-6">
            <div className="text-xs text-muted-foreground">Check-out</div>
            <div className="font-semibold text-xl">{checkOutDate}</div>
          </div>
        </div>
        <DialogFooter>
       
        </DialogFooter>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-2">
            <AccordionTrigger>Modify Accomodation</AccordionTrigger>
            <AccordionContent>
              <AccommodationFormV2
                action='updateAccommodation'
                accommodationId={accommodationId}
                pricePerNight={pricePerNight}
                city={city}
                hotelName={hotelName}
                checkIn={new Date(checkInDate)}
                checkOut={new Date(checkOutDate)}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
}

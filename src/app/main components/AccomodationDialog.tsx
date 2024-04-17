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

export function AccommodationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="text-sm text-muted-foreground cursor-pointer hover:opacity-30">
          Details
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Hotel Riviera</DialogTitle>
          <DialogDescription>
            Booking Details
          </DialogDescription>
        </DialogHeader>
        {/* Header */}
        <div className="grid grid-cols-7 ">
          <div className="col-span-5">
            <div className="font-semibold">Deluxe Room, Sea View</div>
            <div>2 adults, 1 child</div>
          </div>
          <div className="col-span-2 flex my-2 items-center justify-end">
            <i className="material-icons">hotel</i>
            <div className="ml-2">3 nights</div>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="grid grid-cols-12">
          <div className="col-span-6">
            <div className="text-xs text-muted-foreground">Check-in</div>
            <div className="font-semibold text-xl">25 April 2024</div>
            <div className="text-xs text-muted-foreground">From 15:00</div>
          </div>
          <div className="col-span-6">
            <div className="text-xs text-muted-foreground">Check-out</div>
            <div className="font-semibold text-xl">28 April 2024</div>
            <div className="text-xs text-muted-foreground">Before 12:00</div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button">
            <i className="material-icons">print</i> Print Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

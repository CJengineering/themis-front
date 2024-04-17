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
import { Separator } from '@/components/ui/separator';

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="text-sm text-muted-foreground cursor-pointer hover:opacity-30">
          {' '}
          Details
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tunis - Nice</DialogTitle>
          <DialogDescription>
           Departure ticket
          </DialogDescription>
        </DialogHeader>
        {/* Header */}
        <div className="grid grid-cols-7 ">
          <div className="col-span-5">
            <div>TU345</div>
            <div>Tunisair</div>
          </div>
          <div className="col-span-2 flex my-2">
            <i className="material-icons col-span-1">
              airline_seat_recline_normal
            </i>
            <div>Bussiness</div>
          </div>
        </div>
        <Separator className="my-" />
        <div className="grid grid-cols-12">
          <div className="col-span-3">
            <div className="text-xs text-muted-foreground">20 April 2024</div>
            <div className="font-semibold text-xl">20:34</div>
            <div className="flex space-x-2">
              <p className='font-bold'>Tunis</p>
              <i className="material-icons col-span-1">flight_takeoff</i>
            </div>
          </div>
          <div className="relative col-span-6" >
            <div className="dashed-line"></div>
            <span className="material-symbols-outlined rotate-90 animated-plane">
              flight
            </span>
          </div>
          <div className="col-span-3">
            <div className="text-xs text-muted-foreground">20 April 2024</div>
            <div className="font-semibold text-xl">22:34</div>
            <div className="flex space-x-2">
              <p className='font-bold'>Nice</p>
              <i className="material-icons col-span-1">flight_land</i>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button">
            <i className="material-icons">print</i> Print Ticket
          </Button>
        </DialogFooter>{' '}
      
      </DialogContent>
    </Dialog>
  );
}

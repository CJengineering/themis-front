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
// Form specific to bus tickets
import { useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { createPresentationUrl2 } from '../features/Presentations';
import { useAppSelector } from '../features/hooks';
import { BusTicketForm } from './BusTicketFrom';

interface BusDialogProps {
  busTicketId: number;
  departureDate?: string;
  departureCity?: string;
  arrivalDate?: string;
  arrivalCity?: string;
  description?: string;
}

export function BusDialog({
  busTicketId,
  departureDate,
  departureCity,
  arrivalDate,
  arrivalCity,
  description,
}: BusDialogProps) {
  const { toast } = useToast();
  const url2 = useAppSelector(createPresentationUrl2);
  const { tripId } = useParams();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="text-sm text-blue-700 underline cursor-pointer hover:opacity-30">
          see details
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{`${departureCity} to ${arrivalCity}`}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Separator className="my-2" />
        <div className="grid grid-cols-12">
          <div className="col-span-3">
            <div className="text-xs text-muted-foreground">{departureDate}</div>
            <div className="font-bold">{departureCity}</div>
          </div>
          <div className="relative col-span-6">
            <div className="dashed-line"></div>
            <span className="material-symbols-outlined  animated-plane">
              airport_shuttle
            </span>
          </div>
          <div className="col-span-3">
            <div className="text-xs text-muted-foreground">{arrivalDate}</div>
            <div className="font-bold">{arrivalCity}</div>
          </div>
        </div>
        <DialogFooter></DialogFooter>
        <BusTicketForm busId={busTicketId} />
      </DialogContent>
    </Dialog>
  );
}

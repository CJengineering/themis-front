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
import { FlightTicketForm } from './FlightTicketForm';
import { useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { createPresentationUrl2 } from '../features/Presentations';
import { useAppSelector } from '../features/hooks';

interface DialogDemoProps {
  flightId: number;
  //flightNumber: string;
  //airline: string;
  //classType: string;
  departureDate: string;
  //departureTime: string;
  departureCity: string;
  arrivalDate: string;
  //arrivalTime: string;
  arrivalCity: string;
  title: string;
  description: string;
}

export function DialogDemo({
  //flightNumber,
  //airline,
  //classType,
  flightId,
  departureDate,
  //departureTime,
  departureCity,
  arrivalDate,
//  arrivalTime,
  arrivalCity,
  title,
  description,
}: DialogDemoProps) {
  const { toast } = useToast();
  const url2 = useAppSelector(createPresentationUrl2);
  const {tripId} = useParams()

  
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="text-sm text-blue-700 underline cursor-pointer hover:opacity-30">
          see details
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {/* Header */}
        {/* <div className="grid grid-cols-7">
          <div className="col-span-5">
            <div>{flightNumber}</div>
            <div>{airline}</div>
          </div>
          <div className="col-span-2 flex my-2">
            <i className="material-icons col-span-1">airline_seat_recline_normal</i>
            <div>{classType}</div>
          </div>
        </div> */}
        <Separator className="my-2" />
        <div className="grid grid-cols-12">
          <div className="col-span-3">
            <div className="text-xs text-muted-foreground">{departureDate}</div>
            {/* <div className="font-semibold text-xl">{departureTime}</div> */}
            <div className="flex space-x-2">
              <p className="font-bold">{departureCity}</p>
              <i className="material-icons col-span-1">flight_takeoff</i>
            </div>
          </div>
          <div className="relative col-span-6">
            <div className="dashed-line"></div>
            <span className="material-symbols-outlined rotate-90 animated-plane">
              flight
            </span>
          </div>
          <div className="col-span-3">
            <div className="text-xs text-muted-foreground">{arrivalDate}</div>
            {/* <div className="font-semibold text-xl">{arrivalTime}</div> */}
            <div className="flex space-x-2">
              <p className="font-bold">{arrivalCity}</p>
              <i className="material-icons col-span-1">flight_land</i>
            </div>
          </div>
        </div>
        <DialogFooter>
        </DialogFooter>
        <FlightTicketForm flightId= {flightId} />
        
      </DialogContent>
    </Dialog>
  );
}

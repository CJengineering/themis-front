import { cities } from '@/cities';
import DatePicker from '@/components/date-picker';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
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
import { useForm } from 'react-hook-form';
import { FormGeneral } from './FormGeneral';
import { TravelInitiateForm } from './TravelInitiateForm';
import { Card } from '@/components/ui/card';
import StatusSteps from './StatusSteps';


export function TravelForm() {

  const [isDialogOpen, setIsDialogOpen] = useState(false);

    const closeDialog = () => {
        setIsDialogOpen(false);
    };
    const openDialog = () => {
        setIsDialogOpen(true);
    }
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
      <div  onClick={openDialog}>
        New travel 
      </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Trip</DialogTitle>
          <DialogDescription>
           Please follow the steps below to complete this trip
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-12 gap-4 py-4">
          <div className="col-span-3">
            <StatusSteps statusTravel={"new"}></StatusSteps>
          </div>
          <div className="col-span-9">
            <h4 className="scroll-m-20 text-l mb-4 font-semibold tracking-tight">
              Request
            </h4>
            <TravelInitiateForm  onClose={closeDialog} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

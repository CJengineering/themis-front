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
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Travel</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Trip</DialogTitle>
          <DialogDescription>
           Please follow the steps below to complete this trip
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-8 gap-4 py-4">
          <div className="col-span-2">
            <StatusSteps statusTravel={"new"}></StatusSteps>
          </div>
          <div className="col-span-6">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Request
            </h4>
            <TravelInitiateForm  onClose={closeDialog} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

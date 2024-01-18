import { cities } from '@/cities';
import DatePicker from '@/components/date-picker';
import { InputCustom } from '@/components/ui/InputCustom';
import { Badge } from '@/components/ui/badge';
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
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { is } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import StatusSteps from './StatusSteps';
import { TravelAuthForm, TravelItem } from './TravelAuthForm';
import { TravelValidationForm } from './TravelValidationForm';
import { createPresentationUrl } from '../features/Presentations';
import { useAppSelector } from '../features/hooks';
import { TravelApprovalForm } from './TravelApprovalForm';
import { StatusInput, mapStatusToOutput, mapStatusToSteps } from '../travel/columns';
interface Country {
  capital: string;
  // Include other fields from the API response if needed
}
interface PropsTravelAuthForm {
  id: string;
}
export function TravelAdminForm(props: PropsTravelAuthForm) {
  const [travel, setTravel] = useState<TravelItem>();
  const url = useAppSelector(createPresentationUrl);
  const userString = localStorage.getItem('user-data');
  if (!userString) return null;
  const user = JSON.parse(userString);
  const { id } = props;
  const asTraveller = travel?.user.email === user.email;
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);
  useEffect(() => {
    const fetchTravel = async () => {
      try {
        const response = await fetch(`${url}/travel/${id}`);
        const data: TravelItem = await response.json();
        setTravel(data);
      } catch (error) {
        console.error('Error fetching travel:', error);
      }
    };
    fetchTravel();
  }, []);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const handleSwitchChange = () => {
    setIsRoundTrip(!isRoundTrip);
  };
  const handleTripTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsRoundTrip(event.target.value === 'roundTrip');
  };
  const transitionStyle = {
    transition: 'opacity 0.5s ease-in-out, max-height 1s ease-in-out',
    maxHeight: isRoundTrip ? '500px' : '0', // Adjust max height as needed
    opacity: isRoundTrip ? 1 : 0,
  };
  return (
    <>
      <DialogTitle>  {travel?.name }</DialogTitle>
      <DialogDescription>
        Please follow the steps below to complete this trip
      </DialogDescription>
      <div className="grid md:grid-cols-12 gap-4 py-4 ">
        <div className=" col-span-12 md:col-span-3">
          <StatusSteps
            statusTravel={travel?.status ? travel.status : 'Request'}
          ></StatusSteps>
        </div>
        <div className="col-span-12 md:col-span-9  ">
          <h4 className="scroll-m-20 text-l pl-2  mb-4 font-semibold tracking-tight">
          {mapStatusToSteps(travel?.status as StatusInput)}
          </h4>
          {user.role === 'traveller' ||(travel?.status=== "Authentication"&& asTraveller) ? (
            <TravelValidationForm id={id} />
          ) : user.role === 'validator' ? (
            <TravelApprovalForm id={id} />
          ) : (
            <TravelAuthForm id={id} />
          )}
        </div>
      </div>
    </>
  );
}

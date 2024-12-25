import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { fetchSingleTrip } from '../features/trip/fetchTrip';
import { createPresentationUrl2 } from '../features/Presentations';
import { de } from 'date-fns/locale';
import { Dialog } from '@radix-ui/react-dialog';
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

interface TripButtonsProps {
  status: string; // 'saved' or other status
  onDelete?: () => void; // Optional callback to handle after deletion
}

export function TripButtons({ status, onDelete }: TripButtonsProps) {
  const { toast } = useToast();
  console.log('status', status);
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const [declineDescription, setDeclineDescription] = useState('');
  const userData = localStorage.getItem('user-data');
  const url2 = useAppSelector(createPresentationUrl2);

  let userRole = '';
  if (userData) {
    const user = JSON.parse(userData);

    userRole = user.role;
  } else {
    console.log('no user data');
  }
  const isTravelAgent = userRole === 'agent';
  const isValidator = userRole === 'validator';
  const isFinance = userRole === 'financial';
  const isTraveller = userRole === 'traveller';
  console.log('userRole', userRole);
  const dispatch = useAppDispatch();
  async function declineTrip(declineDescription: string) {
    try {
      const response = await fetch(`${url2}/trips/${tripId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: {
            type: 'changeToDecline',
            data: {
              status: 'Declined',
              declineDescription,
            },
          },
          fieldData: {}, // Pass any additional field data if needed
        }),
      });

      if (response.ok) {
        toast({
          title: 'Trip Updated',
          description: `The trip status has been updated to Declined.`,
        });
        await dispatch<any>(fetchSingleTrip(`${url2}/trips/${tripId}`));
      } else {
        toast({
          title: 'Error Updating Trip',
          description:
            'There was an issue updating the trip. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error updating trip:', error);
      toast({
        title: 'Error Updating Trip',
        description: 'There was an issue updating the trip. Please try again.',
        variant: 'destructive',
      });
    }
  }
  async function updateTripStatus(newStatus: string) {
    try {
      const response = await fetch(`${url2}/trips/${tripId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: {
            type: 'changeStatus',
            data: {
              status: newStatus,
            },
          },
          fieldData: {}, // Pass any additional field data if needed
        }),
      });

      if (response.ok) {
        toast({
          title: 'Trip Updated',
          description: `The trip status has been updated to ${newStatus}.`,
        });
        await dispatch<any>(fetchSingleTrip(`${url2}/trips/${tripId}`));
      } else {
        toast({
          title: 'Error Updating Trip',
          description:
            'There was an issue updating the trip. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error updating trip:', error);
      toast({
        title: 'Error Updating Trip',
        description: 'There was an issue updating the trip. Please try again.',
        variant: 'destructive',
      });
    }
  }
  // Handle trip deletion
  async function handleDeleteTrip() {
    try {
      const response = await fetch(`${url2}/trips/${tripId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: 'Trip Deleted',
          description: 'The trip has been successfully deleted.',
        });
        if (onDelete) {
          onDelete(); // Call optional onDelete callback if provided
        } else {
          navigate('/'); // Redirect to the trips list page
        }
      } else {
        toast({
          title: 'Error Deleting Trip',
          description:
            'There was an issue deleting the trip. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error deleting trip:', error);
      toast({
        title: 'Error Deleting Trip',
        description: 'There was an issue deleting the trip. Please try again.',
        variant: 'destructive',
      });
    }
  }
  function handleTest() {
    alert('Test');
    updateTripStatus('TEST');
  }
  function handleSendRequestTest() {
    updateTripStatus('Request');
  }
  function handleSendRequest() {
    updateTripStatus('Request');
  }

  function handleAuthentication() {
    updateTripStatus('Authentication');
  }

  function handleValidation() {
    updateTripStatus('Validation');
  }

  function handleAuthorisation() {
    updateTripStatus('Authorisation');
  }

  function handleApproval() {
    updateTripStatus('Approval');
  }

  function handleFinalisation() {
    updateTripStatus('Finalisation');
  }
  function handleStatus(status: string) {
    updateTripStatus(status);
  }

  return (
    <div className="flex space-x-4 fixed bottom-0 right-14 md:bottom-4 md:right-28">
      {isTraveller && (
        <Button type="button" onClick={() => handleStatus(status)}>
          Email reminder {status}
        </Button>
      )}
      {isValidator && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Decline</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Decline Trip</DialogTitle>
            <DialogDescription>
              <Input
                type="text"
                placeholder="Reason for declining"
                value={declineDescription}
                onChange={(e) => setDeclineDescription(e.target.value)}
                className="input-class" // Add any relevant styling
              />
              <Button
                type="button"
                onClick={() => {
                  if (!declineDescription.trim()) {
                    toast({
                      title: 'Error',
                      description:
                        'Please provide a reason for declining the trip.',
                      variant: 'destructive',
                    });
                    return;
                  }
                  declineTrip(declineDescription);
                }}
                className="mt-2 bg-red-500"
              >
                Decline
              </Button>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      )}

      <Button type="button" onClick={handleSendRequestTest}>
        Back to Request
      </Button>
      {status === 'Saved' && (
        <Button
          type="button"
          onClick={handleSendRequest}
          className="bg-request text-white"
        >
          Request
        </Button>
      )}
      <Button
        type="button"
        onClick={handleDeleteTrip}
        style={{ backgroundColor: 'red', color: 'white' }}
      >
        Delete Trip
      </Button>

      {isTravelAgent && status === 'Request' && (
        <Button
          type="button"
          onClick={handleAuthentication}
          className="bg-authenticated"
        >
          Authenticate
        </Button>
      )}
      {status === 'Authentication' && (
        <Button
          type="button"
          onClick={handleValidation}
          className="bg-validated"
        >
          Validate
        </Button>
      )}
      {(isFinance || isValidator) && status === 'Validation' && (
        <Button
          type="button"
          onClick={handleAuthorisation}
          className="bg-authorised"
        >
          Authorise
        </Button>
      )}
      {isValidator && status === 'Authorisation' && (
        <Button type="button" onClick={handleApproval} className="bg-approved">
          Approve
        </Button>
      )}
      {isTravelAgent && status === 'Approval' && (
        <Button
          type="button"
          onClick={handleFinalisation}
          className="bg-finalised"
        >
          Finalise
        </Button>
      )}
    </div>
  );
}

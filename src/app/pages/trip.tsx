import { DataTable } from '../travel/data-table';
import { travelColumns } from '../travel/columns';
import { fakeCostData, travels } from '@/fake-travel';
import { TravelAdminForm } from '../main components/TravelAdminForm';
import { AccordionUI } from '../main components/AccordionUI';
import VerticalTimeline from '../main components/VerticalTimeLine';
import Header from '../main components/Header';
import TripMetaData from '../main components/TripMetaData';
import ExpensesTable from '../main components/ExpensesTable';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { DialogDemo } from '../main components/DialogDemo';
import { AccommodationDialog } from '../main components/AccomodationDialog';
import { TripRequestForm } from '../main components/TripInitialRequest';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import { DataTableDocuments } from '../documents-table/data-table-documents';
import { DocumentTrip, columnsDocuments } from '../documents-table/column';
import HorizontalStatusSteps from '../main components/HorizontalStatusSteps';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Cost, columnsCosts } from '../costs table/column-costs';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { convertToUSD } from '@/lib/utils';
import { TripButtons } from '../main components/TripButtons';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import {
  createPresentationSingleTrip,
  createPresentationUrl2,
} from '../features/Presentations';
import { fetchSingleTrip } from '../features/trip/fetchTrip';
import VerticalTimeline2 from '../main components/VerticalTimeline2';
import { link } from 'fs';
import DocuemtnsTable from '../main components/DocumentTable';
import DocumentsTable from '../main components/DocumentTable';
import AllTables from '../main components/CostsTableRules';
import { TripData } from '@/interfaces';

const Trip = () => {
  type User = {
    id: string;
    email: string;
    lastName: string;
    firstName: string;
    role: string;
  };
  const { tripId } = useParams();
  const [user, setUser] = useState<User>({
    email: '',
    firstName: '',
    lastName: '',
    role: '',
    id: '',
  });
  const [documentsData, setDocumentsData] = useState<DocumentTrip[]>([]);

  const dispatch = useAppDispatch();
  const trip = useAppSelector(createPresentationSingleTrip);
  const url2 = useAppSelector(createPresentationUrl2);
  const tripStatus = trip.status || 'saved';
  const tripDeclineDescription = trip.declineDescription || '';
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
  const checkUserAccess = (user: User, trip: TripData): boolean => {
    if (!user || !trip) return false; // Ensure both user and trip data exist

    // Check if the user is a traveler and the trip's user ID matches the user's ID
    if (user.role === 'traveller') {
      const userId = Number(user.id);
      const tripUserId = Number(trip.userId);
      console.log('user', user.id, 'trip', trip.userId);
      return tripUserId === userId;
    }

    // Allow access to agents, financial, and validators
    if (['agent', 'validator', 'financial'].includes(user.role)) {
      return true;
    }

    // Default to false if no conditions are met
    return false;
  };
  useEffect(() => {
    const fetchDate = async () => {
      await dispatch<any>(fetchSingleTrip(`${url2}/trips/${tripId}`));
    };

    fetchDate();
  }, []);
  useEffect(() => {
    convertToUSD(2, 'EUR').then((usdAmount) => {
      if (usdAmount !== null) {
        console.log(`Converted amount in USD: $${usdAmount.toFixed(2)}`);
      }
    });
  }, []);
  useEffect(() => {
    const userData = localStorage.getItem('user-data');
    if (userData) {
      const userDataJSON = JSON.parse(userData);
      setUser(userDataJSON);
    }
  }, []);

  // Perform access check when both user and trip are available
  useEffect(() => {
    if (user && trip && trip.userId) {
      const allowed = checkUserAccess(user, trip);
      setIsAllowed(allowed);

      if (!allowed) {
        console.log('You are not allowed to access this page.');
      }
    }
  }, [user, trip]);
  useEffect(() => {
    if (trip && trip.documents) {
      const updatedDocumentsData = trip.documents.map((document) => ({
        tripId: trip.id.toString(),
        id: document.id.toString(),
        type: document.type,
        link: document.url,
        dateCreated: new Date(trip.createdAt).toISOString(), // Ensure date is a valid string
      }));
      setDocumentsData(updatedDocumentsData);
    }
  }, [trip]);

  const handleClose = () => {
    console.log('Trip Request Form closed');
    // Add any additional logic you want to execute on close
  };
  if (isAllowed === null) {
    return <div>Loading...</div>; // Show loading state while checking access
  }

  if (!isAllowed) {
    return <div>You are not allowed to access this page.</div>; // Return a message if access is denied
  }
  return (
    <div>
      <Header />

      <div className="mr-4 py-8">
        <HorizontalStatusSteps statusTravel={tripStatus} declineDescription={tripDeclineDescription}/>
      </div>
      <div className=" ">
        <Tabs defaultValue="itinerary" className="  w-full">
          <TabsList className="w-full justify-around">
            <TabsTrigger value="itinerary">Trip timeline </TabsTrigger>
            <TabsTrigger value="expenses">Expenses </TabsTrigger>
            <TabsTrigger value="documents">Documents </TabsTrigger>
            <TabsTrigger value="costs">Rules </TabsTrigger>
          </TabsList>
          <TabsContent value="itinerary">
            <div className="flex-1 mt-4 ju">
              <VerticalTimeline2 trip={trip} />
            </div>
          </TabsContent>
          <TabsContent value="expenses">
            <div className="flex-1 mt-4">
              <ExpensesTable />
            </div>
          </TabsContent>
          <TabsContent value="documents">
            <DocumentsTable />
          </TabsContent>
          <TabsContent value="costs">
            {user.role !== 'traveller' && <AllTables />}
          </TabsContent>
        </Tabs>
      </div>
      <TripButtons status={trip.status ? trip.status : ' saved'} />
    </div>
  );
};

export default Trip;

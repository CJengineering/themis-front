import { DataTable } from '../travel/data-table';
import { travelColumns } from '../travel/columns';
import { travels } from '@/fake-travel';
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

const TravelV2Page = () => {
  const expenseData = [
    {
      id: 1,
      date: '20/04/24',
      description: 'Flight to Nice',
      category: 'Flight',
      amount: '$500',
    },
    {
      id: 2,
      date: '21/04/24',
      description: 'Hotel in Nice',
      category: 'Accommodation',
      amount: '$300',
    },
    {
      id: 3,
      date: '22/04/24',
      description: 'Lunch with clients',
      category: 'Food',
      amount: '$50',
    },
    // Add more expenses as needed
  ];
   const fakeCostData: Cost[] = [
    {
      type: 'Flight',
      amountUSD: 500,
      amountGBP: 400,
      amountEUR: 450,
      actualAmount: 500,
      limitAmount: 600,
    },
    {
      type: 'Hotel',
      amountUSD: 300,
      amountGBP: 240,
      amountEUR: 270,
      actualAmount: 320,
      limitAmount: 350,
    },
    {
      type: 'Car Rental',
      amountUSD: 200,
      amountGBP: 160,
      amountEUR: 180,
      actualAmount: 200,
      limitAmount: 250,
    },
    {
      type: 'Meals',
      amountUSD: 100,
      amountGBP: 80,
      amountEUR: 90,
      actualAmount: 110,
      limitAmount: 150,
    },
    {
      type: 'Miscellaneous',
      amountUSD: 50,
      amountGBP: 40,
      amountEUR: 45,
      actualAmount: 55,
      limitAmount: 100,
    },
  ];

  const documents: DocumentTrip[] = [
    {
      id: '1',
      type: 'Logistics',
      link: 'https://example.com/documents/project-plan',
      dateCreated: '2024-07-15T10:30:00Z',
    },
    {
      id: '2',
      type: 'Expenses',
      link: 'https://example.com/documents/marketing-strategy',
      dateCreated: '2024-06-10T08:15:00Z',
    },
    {
      id: '3',
      type: 'Itinerary',
      link: 'https://example.com/documents/budget-report-q2',
      dateCreated: '2024-05-25T09:00:00Z',
    },
    {
      id: '4',
      type: 'IDs',
      link: 'https://example.com/documents/client-meeting-notes',
      dateCreated: '2024-08-01T13:00:00Z',
    },
    {
      id: '5',
      type: 'Notes',
      link: 'https://example.com/documents/technical-specification',
      dateCreated: '2024-07-05T12:30:00Z',
    },
  ];
  const expenses: DocumentTrip[] = [
    {
      id: '1',
      type: 'Flight TUN<->NIC',
      link: 'https://example.com/documents/flight-expense',
      dateCreated: '2024-07-15T10:30:00Z',
    },
    {
      id: '2',
      type: 'Taxi NYC<->LON',
      link: 'https://example.com/documents/taxi-expense',
      dateCreated: '2024-06-10T08:15:00Z',
    },
    {
      id: '3',
      type: 'Meals SFO<->BOS',
      link: 'https://example.com/documents/meals-expense',
      dateCreated: '2024-05-25T09:00:00Z',
    },
    {
      id: '4',
      type: 'Car Rental LAX<->HND',
      link: 'https://example.com/documents/car-rental-expense',
      dateCreated: '2024-08-01T13:00:00Z',
    },
    {
      id: '5',
      type: 'Miscellaneous SYD<->SIN',
      link: 'https://example.com/documents/miscellaneous-expense',
      dateCreated: '2024-07-05T12:30:00Z',
    },
  ];
  const accommodations: DocumentTrip[] = [
    {
      id: '1',
      type: 'Hotel TUN<->NIC',
      link: 'https://example.com/documents/hotel-tun-nic',
      dateCreated: '2024-07-15T10:30:00Z',
    },
    {
      id: '2',
      type: 'Hotel NYC<->LON',
      link: 'https://example.com/documents/hotel-nyc-lon',
      dateCreated: '2024-06-10T08:15:00Z',
    },
    {
      id: '3',
      type: 'Hotel SFO<->BOS',
      link: 'https://example.com/documents/hotel-sfo-bos',
      dateCreated: '2024-05-25T09:00:00Z',
    },
    {
      id: '4',
      type: 'Hotel LAX<->HND',
      link: 'https://example.com/documents/hotel-lax-hnd',
      dateCreated: '2024-08-01T13:00:00Z',
    },
    {
      id: '5',
      type: 'Hotel SYD<->SIN',
      link: 'https://example.com/documents/hotel-syd-sin',
      dateCreated: '2024-07-05T12:30:00Z',
    },
  ];

  const handleClose = () => {
    console.log('Trip Request Form closed');
    // Add any additional logic you want to execute on close
  };
  return (
    <div>
      <Header />
      {/* <Dialog>
          <DialogTrigger asChild>
            <Button className="ml-2" variant="blue">New trip</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <TripRequestForm onClose={handleClose}/>
          </DialogContent>
        </Dialog> */}
      <div className="mr-4 py-8">
        <HorizontalStatusSteps statusTravel={'Validation'} />
      </div>
      <div className=" ">
        <Tabs defaultValue="itinerary" className="  w-full">
          <TabsList className="w-full justify-around">
            <TabsTrigger value="itinerary">Trip timeline </TabsTrigger>
            <TabsTrigger value="expenses">Expenses </TabsTrigger>
            <TabsTrigger value="documents">Documents </TabsTrigger>
            <TabsTrigger value="costs">Costs </TabsTrigger>
          </TabsList>
          <TabsContent value="itinerary">
            <div className="flex-1 mt-4 ju">
              <VerticalTimeline />
            </div>
          </TabsContent>
          <TabsContent value="expenses">
            <div className="flex-1 mt-4">
              <ExpensesTable />
            </div>
          </TabsContent>
          <TabsContent value="documents">
            <DataTableDocuments columns={columnsDocuments} data={documents} />
          </TabsContent>
          <TabsContent value="costs">
            <DataTableDocuments columns={columnsCosts} data={fakeCostData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TravelV2Page;

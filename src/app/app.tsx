// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Form } from '@/components/ui/form';
import TypographyH1 from './typoh1';
import MainNavBar from './layout/main-nav-bar';
import TopRightNavBar from './layout/top-right-navbar';
import MainContent from './layout/main-content';
import MainNav from './main components/MainNav';
import TopRightNav from './main components/TopNavBar';
import { DataTable } from './travel/data-table';
import {travelColumns} from './travel/columns';
import {fakeAccommodations, travels} from '../../src/fake-travel'
import { accommodationColumns } from './accomodation/columnAccomodation';


export function App() {
  return (
    <div className="grid grid-cols-12 h-screen">
    
      <div className="hidden md:block md:col-span-2 ">
        <MainNavBar>
          <MainNav />
        </MainNavBar>
      </div>
            
      <div className="col-span-12 md:col-span-10 flex flex-col">
        <div className="">
          <TopRightNavBar>
          <TopRightNav currentPage="Dashboard" />
          </TopRightNavBar>
        </div>
        <div className="flex-grow overflow-auto">
          <MainContent>
          <h2 className="text-xl font-bold mb-4">Travels</h2>
          <DataTable columns={travelColumns} data={travels} />
          <div className="p-4"></div>
          <h2 className="text-xl font-bold mb-4">Accomodation</h2>
          <DataTable columns={accommodationColumns} data={fakeAccommodations} />
          </MainContent>
        </div>
      </div>
    </div>
  );
}

export default App;

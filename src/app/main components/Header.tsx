import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FolderUp, Hotel, Plane, Plus, Receipt } from 'lucide-react';
import React from 'react';
import { TripRequestForm } from './TripInitialRequest';
import { Button } from '@/components/ui/button';
import { AddAccommodationForm } from './AddAccomodationForm';
import { AddFlightForm } from './AddFlightForm';

const Header = () => {
  function handleClose(): void {
    throw new Error('Function not implemented.');
  }
  const handleAddFlight = () => {
    // Logic to add flight
    console.log('Add Flight clicked');
  };

  const handleAddAccommodation = () => {
    // Logic to add accommodation
    console.log('Add Accommodation clicked');
  };

  const handleAddExpenses = () => {
    // Logic to add expenses
    console.log('Add Expenses clicked');
  };

  return (
    <div className="my-4">
      <div className="flex mb-4">
        <div>
          <h1 className="text-4xl font-bold">Nice London</h1>
          <h2 className="text-2xl font-bold">Tim Spiridonov</h2>
          <p className="text-sm text-muted-foreground">J-Pal</p>
          <p className="text-sm text-muted-foreground">Meeting Esther Duflo</p>

          <p>
            <Badge variant={'Finalisation'}> Approved</Badge>
          </p>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-green-500 hover:cursor-pointer  rounded-xl p-2 ml-3 transition duration-300 ease-in-out">
              <Plus className="text-white  text-2xl font-bold" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel></DropdownMenuLabel>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="px-2 flex hover:cursor-pointer hover:text-slate-300 transition duration-300 ease-in-out">
                    <span className="mr-2">
                      <Plane></Plane>
                    </span>
                    <span> Add Flight</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                <AddFlightForm onClose={function (): void {
                    throw new Error('Function not implemented.');
                  } }/>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="px-2 hover:cursor-pointer flex hover:text-slate-300 mt-2 transition duration-300 ease-in-out">
                    <span className="mr-2">
                      <Hotel></Hotel>
                    </span>
                    <span>Add accomodation</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                <AddAccommodationForm/>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="px-2 flex mt-2 hover:cursor-pointer hover:text-slate-300 transition duration-300 ease-in-out">
                    <span className="mr-2">
                      <Receipt />
                    </span>
                    <span>Add expenses</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
         
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="px-2 mb-2  flex mt-2 hover:cursor-pointer hover:text-slate-300 transition duration-300 ease-in-out">
                    <span className="mr-2">
                      <FolderUp />
                    </span>
                    <span>Add documents</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <TripRequestForm onClose={handleClose} />
                </DialogContent>
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          {/* <Card>
            <CardHeader>
              <CardTitle>NIC=&gt;LND</CardTitle>
              <CardDescription>Mon, 22 Aug 2022</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">J-Pal</p>
              <p className="text-sm text-muted-foreground">
                <span className="font-bold">Purpose:</span> Meeting Esther Duflo
              </p>

              <p>
                <span className="font-bold">status :</span>{' '}
                <Badge variant={'Finalisation'}> Approved</Badge>
              </p>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
};

export default Header;

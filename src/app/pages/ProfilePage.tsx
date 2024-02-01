import { useEffect, useState } from 'react';
import { UpdateMileForm } from '../main components/UpdateMileForm';
import { UpdateProfileForm } from '../main components/UpdateProfileForm';
import { UpdateVisaForm } from '../main components/UpdateVisaForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';
import {
  createPresentationDialog,
  createPresentationSecondDialog,
  createPresentationUrl,
  createPresentationUser,
} from '../features/Presentations';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PassportForm } from '../main components/PassportForm';
import { fetchUser } from '../features/user/fetchUser';
import { DataTable } from '../travel/data-table';
import { TravelAdminForm } from '../main components/TravelAdminForm';
import { ColumnPassports } from '../usersData/columnsPassport';
import { DataTableUser } from '../usersData/data-table-passports';
import testFrom from '../main components/testFrom';
import { ColumnVisas } from '../usersData/columnsVisa';
import { ColumnMiles } from '../usersData/columnsMiles';
import { Button } from '@/components/ui/button';
import { toggleSecond } from '../features/openDialog/dialogSlice';
import { Mile, Passport } from '@/interfaces';

interface User {
  [key: string]: any;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  profilerPicUrl?: string;
  mobileNumber?: string;
  address?: string;
  position?: string;
  visa?: Visa[];
  miles?: Miles[];
}
interface Visa {
  name: string;
  startDate: string;
  endDate: string;
}
interface Miles {
  companyName: string;
  miles: string;
}

const PageProfile = () => {
  const [userData, setUserData] = useState<User>();
  const url = useAppSelector(createPresentationUrl);
  const userFullData = useAppSelector(createPresentationUser);
  const dispatch = useAppDispatch();
  const dialogSecond = useAppSelector(createPresentationSecondDialog);
  const currentUser = localStorage.getItem('user-data');
  const currentUserData = JSON.parse(currentUser || '{}');
  const urlUser = `${url}/user/${currentUserData.id}`;

  const arrayPassports = userFullData.passports;
  const arrayVisas = userFullData.visas;
  const arrayMiles = userFullData.miles;
  const namingColumnsPassport: Record<string, string> = {
    passportNumber: 'Passport Number',
    dateOfBirth: 'Date of Birth',
    validFrom: 'Valid From',
    expiry: 'Expiry',
    passportReference: 'Passport Reference',
    nationality: 'Nationality',
  };
  const namingColumnsVisa: Record<string, string> = {
    name: 'Country',
    startDate: 'Start Date',
    endDate: 'End Date',
  };
  const namingColumnsMiles: Record<string, string> = {
    companyName: 'Company Name',
    miles: 'Miles',
  };
  const createGetColumnValue = (namingColumns: Record<string, string>) => {
    return (key: string): string => namingColumns[key] || key;
  };
  const getColumnValueForPassports = createGetColumnValue(
    namingColumnsPassport
  );
  const getColumnValueForVisas = createGetColumnValue(namingColumnsVisa);
  const getColumnValueForMiles = createGetColumnValue(namingColumnsMiles);
  const userDetails = [
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },

    { key: 'mobileNumber', label: 'Mobile Number' },
    { key: 'address', label: 'Address' },
  ];
  const toggleSecondDialog = () => {
   
      dispatch(toggleSecond());
    
  }
  console.log('this is OPEN OR CLOSE', dialogSecond);
  const firstTest = `${userFullData.visas ?? 'DefaultFirstName'}`;
  useEffect(() => {
    const fetchUserApi = async () => {
      const response = await fetch(`${url}/user/${currentUserData.id}`);
      const data = await response.json();
      console.log(data);
      setUserData(data);
    };
    const fetchDate = async () => {
      await dispatch<any>(fetchUser(urlUser));
    };
   
    fetchDate();
  }, []);
  console.log('this is the user Fulldata', userFullData);
  return (
    <div>
      <div className="">
        <Avatar>
          <AvatarImage src={userFullData.user.profilePicUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
   
        <div className="text-3xl font-bold  mb-6">
          {userFullData.user.firstName} {userFullData.user.lastName}
        </div>
        <Tabs defaultValue="account" className="w-[600px]">
          <TabsList>
            <TabsTrigger value="account">Traveler details</TabsTrigger>
            <TabsTrigger value="details">Personal </TabsTrigger>
            <TabsTrigger value="passport">Passport </TabsTrigger>
            <TabsTrigger value="visas">Visa</TabsTrigger>
            <TabsTrigger value="miles">Frequent flyer miles </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
                <CardDescription>Traveler details</CardDescription>
              </CardHeader>
              <CardContent>
                {userDetails.map(({ key, label }) => {
                  const value = userFullData.user
                    ? userFullData.user[key as keyof User]
                    : undefined;

                  // Special rendering for passportReference as a hyperlink

                  return (
                    <div key={key} className="flex items-center mb-2">
                      <p className="font-bold mr-2">{label}:</p>
                      <p>{value}</p>
                    </div>
                  );
                })}
                {userFullData.visas && userFullData.visas.length > 0 && (
                  <div className="mt-4">
                    <p className="font-bold mb-2">Visas:</p>
                    {userFullData.visas.map((visa: Visa, index: number) => (
                      <div key={index} className="mb-2">
                        <p className="font-semibold">Country: {visa.name}</p>
                        <p>Start Date: {visa.startDate}</p>
                        <p>End Date: {visa.endDate}</p>
                      </div>
                    ))}
                  </div>
                )}
                {userFullData.miles && userFullData.miles.length > 0 && (
                  <div className="mt-4">
                    <p className="font-bold mb-2">Frequent flyer miles</p>
                    {userFullData.miles.map((mile: Mile, index: number) => (
                      <div key={index} className="mb-2">
                        <p className="font-semibold">
                          Company: {mile.companyName}
                        </p>
                        <p>miles: {mile.miles}</p>
                      </div>
                    ))}
                    
                  </div>
                )}
                    {userFullData.passports && userFullData.passports.length > 0 && (
                  <div className="mt-4">
                    <p className="font-bold mb-2">Passports</p>
                    {userFullData.passports.map((passport: Passport, index: number) => (
                      <div key={index} className="mb-2">
                        <p className="font-semibold">
                          Country: {passport.nationality}
                        </p>
                      
                      </div>
                    ))}
                    
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="details">
            <UpdateProfileForm />
          </TabsContent>
          <TabsContent value="passport">
            <DataTableUser
              columns={ColumnPassports}
              getColumnValue={getColumnValueForPassports}
              dialogContentComponent={PassportForm}
              data={arrayPassports}
            />
            <Dialog open={dialogSecond} onOpenChange={toggleSecondDialog}>
              <DialogTrigger>
                <Button className="mt-8" variant="blue" >
                  Add new passport{' '}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle> New passport form</DialogTitle>
                </DialogHeader>
                <PassportForm />
              </DialogContent>
            </Dialog>
          </TabsContent>
          <TabsContent value="visas">
            <DataTableUser
              columns={ColumnVisas}
              getColumnValue={getColumnValueForVisas}
              dialogContentComponent={UpdateVisaForm}
              data={arrayVisas}
            />
            <Dialog open={dialogSecond} onOpenChange={toggleSecondDialog}>
              <DialogTrigger>
                <Button className="mt-8" variant="blue">
                  Add new visa
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle> New visa form</DialogTitle>
                </DialogHeader>
                <UpdateVisaForm />
              </DialogContent>
            </Dialog>
          </TabsContent>
          <TabsContent value="miles">
            <DataTableUser
              columns={ColumnMiles}
              getColumnValue={getColumnValueForMiles}
              dialogContentComponent={UpdateMileForm}
              data={arrayMiles}
            />
            <Dialog open={dialogSecond} onOpenChange={toggleSecondDialog}>
              <DialogTrigger>
                <Button className="mt-8" variant="blue">
                  Add new frequent flyer miles
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle> New frequent flyer miles form</DialogTitle>
                </DialogHeader>
                <UpdateMileForm />
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PageProfile;

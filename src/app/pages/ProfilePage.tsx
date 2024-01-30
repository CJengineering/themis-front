import { useEffect, useState } from 'react';
import { UpdateMileForm } from '../main components/UpdateMileForm';
import { UpdateProfileForm } from '../main components/UpdateProfileForm';
import { UpdateVisaForm } from '../main components/UpdateVisaForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';
import { createPresentationUrl } from '../features/Presentations';
import { useAppSelector } from '../features/hooks';
interface User {
  [key: string]: any;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  passportNumber: string;
  passportExpiry: string;
  passportReference: string;
  birthDate?: Date | string;
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
  const currentUser = localStorage.getItem('user-data');
  const currentUserData = JSON.parse(currentUser || '{}');
  const formatDate = (date: string | Date | undefined): string => {
    if (date) {
      // Convert to Date object if it's a string and format it
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return format(dateObj, 'PPP');
    }
    return 'Not provided';
  };
  const userDetails = [
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'birthDate', label: 'Birth Date', formatter: formatDate },
    { key: 'mobileNumber', label: 'Mobile Number' },
    { key: 'address', label: 'Address' },
    { key: 'position', label: 'Position' },
    { key: 'passportNumber', label: 'Passport Number' },
    { key: 'passportExpiry', label: 'Passport Expiry' },
    { key: 'passportReference', label: 'Passport Reference' },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        `${url}/user/${currentUserData.id}`
      );
      const data = await response.json();
      console.log(data);
      setUserData(data);
    };
    fetchUser();
  }, []);

  return (
    <div>
      <div className="">
        <div className="text-3xl font-bold  mb-6">
          {userData?.firstName} {userData?.lastName}
        </div>
        <Tabs defaultValue="account" className="w-[600px]">
          <TabsList>
            <TabsTrigger value="account">Traveler details</TabsTrigger>
            <TabsTrigger value="details">Update details </TabsTrigger>
            <TabsTrigger value="visas">Update visas </TabsTrigger>
            <TabsTrigger value="miles">Update miles </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
                <CardDescription>Travel details</CardDescription>
              </CardHeader>
              <CardContent>
                {userDetails.map(({ key, label, formatter }) => {
                  const value = userData
                    ? userData[key as keyof User]
                    : undefined;

                  // Special rendering for passportReference as a hyperlink
                  if (key === 'passportReference' && value) {
                    return (
                      <div key={key} className="flex items-center mb-2">
                        <p className="font-bold mr-2">{label}:</p>
                        <a
                          href={value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Passport pdf link
                        </a>
                      </div>
                    );
                  }

                  return (
                    <div key={key} className="flex items-center mb-2">
                      <p className="font-bold mr-2">{label}:</p>
                      <p>{formatter ? formatter(value) : value}</p>
                    </div>
                  );
                })}
                {userData?.visas && userData.visas.length > 0 && (
                  <div className="mt-4">
                    <p className="font-bold mb-2">Visas:</p>
                    {userData.visas.map((visa: Visa, index: number) => (
                      <div key={index} className="mb-2">
                        <p className="font-semibold">Country: {visa.name}</p>
                        <p>Start Date: {visa.startDate}</p>
                        <p>End Date: {visa.endDate}</p>
                      </div>
                    ))}
                  </div>
                )}
                {userData?.miles && userData.miles.length > 0 && (
                  <div className="mt-4">
                    <p className="font-bold mb-2">Visas:</p>
                    {userData.miles.map((mile: Miles, index: number) => (
                      <div key={index} className="mb-2">
                        <p className="font-semibold">
                          Country: {mile.companyName}
                        </p>
                        <p>miles: {mile.miles}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="details">
            <UpdateProfileForm />
          </TabsContent>
          <TabsContent value="visas">
            <UpdateVisaForm></UpdateVisaForm>
          </TabsContent>
          <TabsContent value="miles">
            <UpdateMileForm></UpdateMileForm>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PageProfile;

import { useEffect, useState } from 'react';
import { UpdateMileForm } from '../main components/UpdateMileForm';
import { UpdateProfileForm } from '../main components/UpdateProfileForm';
import { UpdateVisaForm } from '../main components/UpdateVisaForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PassportForm } from '../main components/PassportForm';
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

    { key: 'mobileNumber', label: 'Mobile Number' },
    { key: 'address', label: 'Address' },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`${url}/user/${currentUserData.id}`);
      const data = await response.json();
      console.log(data);
      setUserData(data);
    };
    fetchUser();
  }, []);

  return (
    <div>
      <div className="">
        <Avatar>
          <AvatarImage src={userData?.profilePicUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="text-3xl font-bold  mb-6">
          {userData?.firstName} {userData?.lastName}
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
                  const value = userData
                    ? userData[key as keyof User]
                    : undefined;

                  // Special rendering for passportReference as a hyperlink

                  return (
                    <div key={key} className="flex items-center mb-2">
                      <p className="font-bold mr-2">{label}:</p>
                      <p>{value}</p>
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
            </Card>
          </TabsContent>
          <TabsContent value="details">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Edit</AccordionTrigger>
                <AccordionContent>
                  <UpdateProfileForm />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value="passport">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Edit</AccordionTrigger>
                <AccordionContent>
                  <PassportForm />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value="visas">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Edit</AccordionTrigger>
                <AccordionContent>
                  <UpdateVisaForm></UpdateVisaForm>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value="miles">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Edit</AccordionTrigger>
                <AccordionContent>
                  <UpdateMileForm />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PageProfile;

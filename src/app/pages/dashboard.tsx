import { fakeAccommodations, travels } from '@/fake-travel';
import { travelColumns } from '../travel/columns';
import { DataTable } from '../travel/data-table';
import { accommodationColumns } from '../accomodation/columnAccomodation';
import { createPresentationUrl, createPrsentationTravel } from '../features/Presentations';
import { useAppDispatch, useAppSelector, useUserData } from '../features/hooks';
import { useEffect } from 'react';
import { fetchTravels } from '../features/travel/fetchTravel';

const Dashboard = () => {
  const travelData = useAppSelector(createPrsentationTravel);
  const userString = localStorage.getItem('user-data');
  if (!userString) return null;
  const userData = JSON.parse(userString);
  const dispatch = useAppDispatch();
  const url = useAppSelector(createPresentationUrl)

  const userId = userData?.id 
  const userRole = userData?.role
  useEffect(() => {
    const fetchDate = async () => {
      await dispatch<any>(fetchTravels(`${url}/travel`,{userRole:`${userRole}`,userId:`${userId}`}));
    };
    fetchDate();
  }, []);
  console.log('this is the data', travelData);
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Travels</h2>
      
      <DataTable columns={travelColumns} data={travelData} />
      <div className="p-4"></div>
      {/* <h2 className="text-xl font-bold mb-4">Accomodation</h2>
      <DataTable columns={accommodationColumns} data={fakeAccommodations} /> */}
    </>
  );
};
export default Dashboard;

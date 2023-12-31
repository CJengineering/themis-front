import { fakeAccommodations, travels } from '@/fake-travel';
import { travelColumns } from '../travel/columns';
import { DataTable } from '../travel/data-table';
import { accommodationColumns } from '../accomodation/columnAccomodation';
import { createPrsentationTravel } from '../features/Presentations';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { useEffect } from 'react';
import { fetchTravels } from '../features/travel/fetchTravel';

const Dashboard = () => {
  const travelData = useAppSelector(createPrsentationTravel);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchDate = async () => {
      await dispatch<any>(fetchTravels('http://localhost:3000/travel'));
    };
    fetchDate();
  }, []);
  console.log('this is the data', travelData);
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Travels</h2>
      <DataTable columns={travelColumns} data={travels} />
      <div className="p-4"></div>
      {/* <h2 className="text-xl font-bold mb-4">Accomodation</h2>
      <DataTable columns={accommodationColumns} data={fakeAccommodations} /> */}
    </>
  );
};
export default Dashboard;

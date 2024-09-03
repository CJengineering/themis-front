import { fakeAccommodations, travels } from '@/fake-travel';
import { travelColumns } from '../travel/columns';
import { DataTable } from '../travel/data-table';
import { accommodationColumns } from '../accomodation/columnAccomodation';
import {
  createPresentationUrl,
  createPrsentationTravel,
} from '../features/Presentations';
import { useAppDispatch, useAppSelector, useUserData } from '../features/hooks';
import { useEffect, useState } from 'react';
import { fetchTravels } from '../features/travel/fetchTravel';
import { TravelAdminForm } from '../main components/TravelAdminForm';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  const travelData = useAppSelector(createPrsentationTravel);
  const userString = localStorage.getItem('user-data');
  if (!userString) return null;
  const userData = JSON.parse(userString);
  const dispatch = useAppDispatch();
  const url = useAppSelector(createPresentationUrl);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const userId = userData?.id;
  const userRole = userData?.role;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress < 100) {
          return oldProgress + 10;
        }
        clearInterval(interval);
        return 100;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const fetchDate = async () => {
      await dispatch<any>(
        fetchTravels(`${url}/travel`, {
          userRole: `${userRole}`,
          userId: `${userId}`,
        })
      );
    };
    if (progress === 100) {
      fetchDate();
    }
  }, [progress]);
  console.log('this is the data', travelData);
  return (
    <>
 
      {progress < 100 ? (
        <div className="flex justify-center items-center h-[80vh]">
          <div className="w-[600px]">
            <p>Loading...</p>
            <Progress value={progress} className="w-[60%]" />
          </div>
        </div>
      ) : (
        travelData &&
        travelData.length > 0 && ( // Ensure travelData is loaded and not empty
          <DataTable
            columns={travelColumns}
            data={travelData}
            dialogContentComponent={TravelAdminForm}
          />
        )
      )}

      <div className="p-4"></div>
      {/* <h2 className="text-xl font-bold mb-4">Accomodation</h2>
      <DataTable columns={accommodationColumns} data={fakeAccommodations} /> */}
    </>
  );
};
export default Dashboard;

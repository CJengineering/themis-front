import React, { useEffect, useState } from 'react';
import { DataTable } from '../travel/data-table';
import { travelColumns } from '../travel/columns';
import { travels } from '@/fake-travel';
import { TravelAdminForm } from '../main components/TravelAdminForm';
import { createPresentationSingleTrip, createPresentationTrip } from '../features/Presentations';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { fetchTravels } from '../features/travel/fetchTravel';
import { fetchSingleTrip, fetchTrips } from '../features/trip/fetchTrip';
import { tripColumns } from '../trip/columns';
import { DataTableTrip } from '../trip/data-table-trip';

const TripsTable = () => {
  const travelData = useAppSelector(createPresentationTrip);

  const userString = localStorage.getItem('user-data');
  if (!userString) return null;
  const userData = JSON.parse(userString);
  const dispatch = useAppDispatch();
  const url = 'http://localhost:3000';

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
        fetchTrips(`${url}/trips`, {
        
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
    <div>
      <h2 className="text-xl font-bold mb-4">Trips</h2>

      
     <DataTableTrip columns={tripColumns} data={travelData}  dialogContentComponent={TravelAdminForm} /> 
    </div>
  );
};

export default TripsTable;
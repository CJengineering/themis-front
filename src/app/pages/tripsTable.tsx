import React, { useEffect, useState } from 'react';
import { DataTable } from '../travel/data-table';
import { travelColumns } from '../travel/columns';
import { oldTravelDataJSON, travels } from '@/fake-travel';
import { TravelAdminForm } from '../main components/TravelAdminForm';
import {
  createPresentationSingleTrip,
  createPresentationTrip,
  createPresentationUrl2,
} from '../features/Presentations';
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
  const url2 = useAppSelector(createPresentationUrl2);

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
        fetchTrips(`${url2}/trips`, {
          userId: `${userId}`,
        })
      );
    };
    if (progress === 100) {
      fetchDate();
    }
  }, [progress]);
  const filterTravelData = (data: any[], role: string, userId: string) => {
    if (role === 'traveler') {
      return data.filter((trip) => {
        console.log('Checking trip:', trip.id, 'with userId:', trip.userId);
        return String(trip.userId) === String(userId);
      });
    }
    // If role is agent, validator, or financial, show everything
    if (['agent', 'validator', 'financial'].includes(role)) {
      return data;
    }
    return [];
  };
  console.log('this is the data', travelData);
  console.log('this is the user role', userRole);


  const travelIdarray = travelData.map((trip) => String(trip.id));


  // Apply the filter to travelData
  const filteredTravelData = filterTravelData(travelData, userRole, userId);

  //dele data

  async function deleteData(dataArray: string[]) {
    for (const item of dataArray) {
      try {
        const response = await fetch(`${url2}/trips/${item}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          console.log(`Successfully deleted trip ID: ${item}`);
        } else {
          console.error(
            `Failed to delete trip ID: ${item}`,
            response.statusText
          );
        }
      } catch (error) {
        console.error(`Error deleting trip ID: ${item}`, error);
      }
    }
  }
  async function migrateData(oldData: any) {
    for (const trip of oldData) {
      const [firstName, lastName] = trip.userFullName.split(' ');
      const email = `${firstName.toLowerCase()}}@communityjameel.org`; // Assuming a standard email format

      const currencyRates = {
        GBP: 1, // Since original is in GBP
        USD: 1.36, // Example rates
        EUR: 1.17,
        SAR: 5.1,
      };

      const flights = [
        {
          id: trip.id,
          cityDeparture: trip.departureCity,
          cityArrival: trip.arrivalCity,
          departureDate: new Date(trip.departureDate),
          priceInUSD: trip.costOriginal * currencyRates.USD,
          priceInEUR: trip.costOriginal * currencyRates.EUR,
          priceInGBP: trip.costOriginal * currencyRates.GBP,
          priceSAR: trip.costOriginal * currencyRates.SAR,
          roundTrip: trip.tripType,
          returnDate: trip.returnDate ? new Date(trip.returnDate) : null,
          ticketImageUrl: trip.bookingReferenceDocument,
        },
      ];
      const documents = [
        {
          id: trip.id,
          name: 'Booking Reference',
          type: 'Flight Ticket',
          url: trip.bookingReferenceDocument,
        },
      ];

      const submissionData = {
        fieldData: {
          name: trip.name,
          purpose: 'Business Trip', // Assuming a default purpose since it's not in the old data
          userId: String(trip.userId),
          userRole: 'Employee', // Assuming a default role since it's not in the old data
          firstName,
          lastName,
          email,
          status: 'Finalisation',
          flights,
          accommodations: [], // Assuming no accommodation data available
          expenses: [], // Assuming no expenses data available
          documents,
        },
      };

      const response = await fetch(`${url2}/trips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        console.error(
          `Failed to migrate trip ID: ${trip.id}`,
          response.statusText
        );
      }
    }
  }

  return (
    <div>
   
      <h2 className="text-xl font-bold mb-4">Trips</h2>

      <DataTableTrip
        columns={tripColumns}
        data={filteredTravelData}
        dialogContentComponent={TravelAdminForm}
      />
    </div>
  );
};

export default TripsTable;

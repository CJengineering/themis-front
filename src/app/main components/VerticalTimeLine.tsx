import React, { useEffect, useState } from 'react';
import { DialogDemo } from './DialogDemo';
import { Hotel, Plane } from 'lucide-react';
import { mapTripToStops } from '@/lib/mappers/mapTrpToStops';
import { Stop, Trip } from '@/interfaces';
import { AccommodationDialog } from './AccomodationDialog';
import { Badge } from '@/components/ui/badge';
import TripMetaData from './TripMetaData';

const VerticalTimeline: React.FC = () => {
  const [stops, setStops] = useState<Stop[]>([]);

  const fakeTrip: Trip = {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    fieldData: {
      name: "NYC <-> SFO | TD",
      userId: "123",
      subject: "Business Meeting",
      status: "Request",
      purpose: "Client presentation",
      relatedProgramme: "Client presentation",
      departureDate: new Date("2024-09-01T10:00:00Z"),
      returnDate: new Date("2024-09-10T10:00:00Z"),
      cityStart: "New York",
      cityEnd: "San Francisco",
      transitionalCities: [],
      daysOfStay: [],
      flights: [
        {
          id: 1,
          cityDeparture: "New York",
          cityArrival: "San Francisco",
          departureDate: new Date("2024-09-01T10:00:00Z"),
          roundTrip: true,
          returnDate: new Date("2024-09-10T10:00:00Z"),
          price: 350, // Example price
          ticketImageUrl: "" // Assuming no ticket image available
        }
      ],
      accommodations: [
        {
          id: 1,
          hotelName: "Hotel California",
          startDate: new Date("2024-09-01T14:00:00Z"),
          leaveDate: new Date("2024-09-10T12:00:00Z"),
          city: "San Francisco",
          checkInHour: "14:00",
          checkOutHour: "12:00",
          lateCheckOut: false,
          pricePerNight: 200,
          totalPrice: 1800, // Example total price calculated from the nights
          bookingImageUrl: "" // Assuming no booking image available
        }
      ],
      expenses: [
        {
          id: 1,
          nature: "Meals",
          amount: 100,
          currency: "USD",
          receiptImageUrl: "" // Assuming no receipt image available
        }
      ]
    }
  };

  useEffect(() => {
    const stopsData = mapTripToStops(fakeTrip);
    setStops(stopsData);
  }, []);

  return (
    <div className='grid grid-cols-12 '>
      <div className=' col-span-6'>

      {stops.map((stop, index) => (
        <div className="relative flex items-center justify-center" key={index}>
          <div className="flex w-full h-40">
            {/* Left Side: Date and Icon */}
            <div
              className={`flex flex-col items-${
                index % 2 === 0 ? 'start' : 'end'
              } w-1/4 pr-4`}
            >
              {stop.type === 'flight' && (
                <div className="flex items-center">
                  <Plane className="mr-2" />
                  <div className="text-sm text-muted-foreground">
                    {stop.date}
                  </div>
                </div>
              )}
              {stop.type === 'accommodation' && (
                <div className="flex items-center">
                  <Hotel className="mr-2" />
                  <div>
                    <div className="text-xl">{stop.city}</div>
                    <div className="text-md">{stop.name}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Timeline Connector and Active Marker */}
            <div className="relative flex items-start justify-center w-8">
              {index < stops.length - 1 && (
                <>
                  <div
                    className={`absolute top-0 w-4 h-4 ${
                      stop.active ? 'bg-green-500' : 'bg-gray-500'
                    } rounded-full shadow-neonBlur`}
                  ></div>
                  <div
                    className="border-l border-dotted border-gray-400 h-full"
                    style={{ borderWidth: '2px' }}
                  ></div>
                </>
              )}
              {index === stops.length - 1 && (
                <div className="absolute top-0 w-4 h-4 bg-red-500 rounded-full shadow-neonBlur"></div>
              )}
            </div>

            {/* Right Side: City and Accommodation Info */}
            <div className="flex flex-col items-start w-3/4 pl-4">
              <div className="text-md">{stop.name}</div>
              <DialogDemo
                flightNumber="TU345"
                airline="Tunisair"
                classType="Business"
                departureDate="20 April 2024"
                departureTime="20:34"
                departureCity="Tunis"
                arrivalDate="20 April 2024"
                arrivalTime="22:34"
                arrivalCity="Nice"
                title="Tunis - Nice"
                description="Departure ticket"
              />
              <Badge variant="inProgress">not booked </Badge>
              {stop.accommodation && (
                <div className="mt-4">
                  <p
                    className={`flex items-center text-xs ${
                      stop.accommodation.status === 'Booked'
                        ? 'text-green-600'
                        : stop.accommodation.status === 'Not Yet Booked'
                        ? 'text-yellow-600'
                        : 'text-gray-600'
                    }`}
                  >
                    <Hotel className="mr-2" />
                    {stop.accommodation.name
                      ?       <div>
                      <div className="text-lg">{stop.city}</div>
                      <div className="text-md">{stop.accommodation.name}</div>
                    </div>
                      : `Accommodation: ${stop.accommodation.status}`}
                  </p>
                  {stop.accommodation.status !== 'Not Added' && (
                    <AccommodationDialog
                      hotelName="Hotel Riviera"
                      roomType="Deluxe Room, Sea View"
                      occupancy="2 adults, 1 child"
                      nights={3}
                      checkInDate="25 April 2024"
                      checkInTime="15:00"
                      checkOutDate="28 April 2024"
                      checkOutTime="12:00"
                      title="Accommodation Details"
                      description="Booking Details"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      </div>
      <div>
        <TripMetaData/>
      </div>
    </div>
  );
};

export default VerticalTimeline;

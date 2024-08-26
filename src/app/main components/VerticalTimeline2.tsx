import React, { useEffect, useState } from 'react';
import { Plane, Hotel } from 'lucide-react';

import { TripData, Stop } from '@/interfaces'; // Ensure these interfaces are correctly defined
import { Badge } from '@/components/ui/badge';
import { mapTripToStops } from '@/lib/mappers/mapTrpToStops';
import { createPresentationSingleTrip } from '../features/Presentations';
import { useAppSelector } from '../features/hooks';
import { DialogDemo } from './DialogDemo';
import { AccommodationDialog } from './AccomodationDialog';

const VerticalTimeline: React.FC<{ trip: TripData }> = () => {
  const [stops, setStops] = useState<Stop[]>([]);
  const trip = useAppSelector(createPresentationSingleTrip);

  useEffect(() => {
    const stopsData = mapTripToStops(trip);
    setStops(stopsData);
  }, [trip]);

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-6">
        {stops.map((stop, index) => (
          <div
            className="relative flex items-center justify-center"
            key={index}
          >
            <div className="flex w-full h-40">
              {/* Left Side: Date and Icon */}
              <div className={`flex flex-col items-start w-1/4 pr-4`}>
                <div className="flex items-center">
                  {stop.type === 'flight' ? (
                    <Plane className="mr-2" />
                  ) : (
                    <Hotel className="mr-2" />
                  )}
                  <div className="text-sm text-muted-foreground">
                    {stop.date}
                  </div>
                </div>
                <div className="text-xs">{stop.time}</div>
              </div>

              {/* Timeline Connector and Active Marker */}
              <div className="relative flex items-start justify-center w-8">
                <div
                  className={`absolute top-0 w-4 h-4 ${
                    index === 0
                      ? 'bg-green-500'
                      : index === stops.length - 1
                      ? 'bg-red-500'
                      : stop.active
                      ? 'bg-green-500'
                      : 'bg-gray-500'
                  } rounded-full shadow-neonBlur`}
                ></div>
                {index < stops.length - 1 && (
                  <div
                    className="border-l border-dotted border-gray-400 h-full"
                    style={{ borderWidth: '2px' }}
                  ></div>
                )}
              </div>

              {/* Right Side: City and Details */}
              <div className="flex flex-col items-start w-3/4 pl-4">
                <div className="text-md">{stop.city}</div>
                <div className="text-md">{stop.name}</div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {stop.type === 'flight' ? (
                    <DialogDemo {...stop.flightTicket} />
                  ) : (
                    <AccommodationDialog {...stop.accomodationDetails} />
                  )}
                </div>

                {/* <Badge
                  variant={
                    stop.status === 'Booked' ? 'confirmed' : 'inProgress'
                  }
                >
                  {stop.status}
                </Badge> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalTimeline;

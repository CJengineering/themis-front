import { Stop, Trip } from '@/interfaces';
import { format } from 'date-fns';
import { getFirstThreeConsonants } from '@/lib/utils'; // Assuming you have this utility function

export const mapTripToStops = (trip: Trip): Stop[] => {
  const { fieldData } = trip;
  const stops: Stop[] = [];

  // Helper function to generate name based on cities
  const generateFlightName = (departureCity: string, arrivalCity: string): string => {
    const departureConsonants = getFirstThreeConsonants(departureCity);
    const arrivalConsonants = getFirstThreeConsonants(arrivalCity);
    return `${departureConsonants} <-> ${arrivalConsonants}`;
  };

  // Add the first leg of the trip
  stops.push({
    time: format(new Date(fieldData.departureDate), 'HH:mm'),
    date: format(new Date(fieldData.departureDate), 'EEE, d MMM yy'),
    city: fieldData.cityEnd,
    name: generateFlightName(fieldData.cityStart, fieldData.cityEnd),
    active: true,
    type: 'flight',
  });

  // Add additional flights and their return flights if Round Trip
  fieldData.flights.forEach((flight) => {
    // Outbound flight
    stops.push({
      time: flight.departureDate ? format(new Date(flight.departureDate), 'HH:mm') : undefined,
      date: flight.departureDate ? format(new Date(flight.departureDate), 'EEE, d MMM yy') : undefined,
      city: flight.cityArrival,
      name: generateFlightName(flight.cityDeparture, flight.cityArrival),
      active: false,
      type: 'flight',
      accommodation: fieldData.accommodations.find(acc => acc.city === flight.cityArrival)
        ? {
            status: 'stai',
            name: fieldData.accommodations.find(acc => acc.city === flight.cityArrival)!.hotelName,
          }
        : { status: 'Not Added' },
    });

    // Return flight if Round Trip
    if (flight.roundTrip && flight.returnDate) {
      stops.push({
        time: format(new Date(flight.returnDate), 'HH:mm'),
        date: format(new Date(flight.returnDate), 'EEE, d MMM yy'),
        city: flight.cityDeparture,
        name: generateFlightName(flight.cityArrival, flight.cityDeparture),
        active: false,
        type: 'flight',
        accommodation: fieldData.accommodations.find(acc => acc.city === flight.cityDeparture)
          ? {
              status: 'status',
              name: fieldData.accommodations.find(acc => acc.city === flight.cityDeparture)!.hotelName,
            }
          : { status: 'Not Added' },
      });
    }
  });

  // Add return leg if it's a round trip (overall trip)
  if (fieldData.returnDate) {
    stops.push({
      time: format(new Date(fieldData.returnDate), 'HH:mm'),
      date: format(new Date(fieldData.returnDate), 'EEE, d MMM yy'),
      city: fieldData.cityStart,
      name: generateFlightName(fieldData.cityEnd, fieldData.cityStart),
      active: false,
      type: 'flight',
    });
  }

  return stops;
};

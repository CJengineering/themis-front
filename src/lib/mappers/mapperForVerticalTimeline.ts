// import { Stop, TripRequest } from '@/interfaces';
// import { format } from 'date-fns';
// import { getFirstThreeConsonants } from '@/lib/utils';  // Assuming you have this utility function

// export const mapTripDataToStops = (tripData: TripRequest): Stop[] => {
//   const stops: Stop[] = [];

//   // Helper function to generate name based on cities
//   const generateFlightName = (departureCity: string, arrivalCity: string): string => {
//     const departureConsonants = getFirstThreeConsonants(departureCity);
//     const arrivalConsonants = getFirstThreeConsonants(arrivalCity);
//     return `${departureConsonants} <-> ${arrivalConsonants}`;
//   };

//   // Add the first leg of the trip
//   stops.push({
//     time: format(new Date(tripData.departureDateLeg1), 'HH:mm'),
//     date: format(new Date(tripData.departureDateLeg1), 'EEE, d MMM yy'),
//     city: tripData.arrivalCityLeg1,
//     name: generateFlightName(tripData.departureCityLeg1, tripData.arrivalCityLeg1),
//     active: true,
//     type: 'flight',
//   });

//   // Add additional flights and their return flights if Round Trip
//   tripData.flights.forEach((flight) => {
//     // Outbound flight
//     stops.push({
//       time: format(new Date(flight.departureDate), 'HH:mm'),
//       date: format(new Date(flight.departureDate), 'EEE, d MMM yy'),
//       city: flight.arrivalCity,
//       name: generateFlightName(flight.departureCity, flight.arrivalCity),
//       active: false,
//       type: 'flight',
//       accommodation: tripData.accommodations.find(acc => acc.city === flight.arrivalCity)
//         ? {
//             status: tripData.accommodations.find(acc => acc.city === flight.arrivalCity)!.status,
//             name: tripData.accommodations.find(acc => acc.city === flight.arrivalCity)!.hotelName,
//           }
//         : { status: 'Not Added' },
//     });

//     // Return flight if Round Trip
//     if (flight.tripType === 'Round Trip' && flight.returnDepartureDate) {
//       stops.push({
//         time: format(new Date(flight.returnDepartureDate), 'HH:mm'),
//         date: format(new Date(flight.returnDepartureDate), 'EEE, d MMM yy'),
//         city: flight.departureCity,
//         name: generateFlightName(flight.arrivalCity, flight.departureCity),
//         active: false,
//         type: 'flight',
//         accommodation: tripData.accommodations.find(acc => acc.city === flight.departureCity)
//           ? {
//               status: tripData.accommodations.find(acc => acc.city === flight.departureCity)!.status,
//               name: tripData.accommodations.find(acc => acc.city === flight.departureCity)!.hotelName,
//             }
//           : { status: 'Not Added' },
//       });
//     }
//   });

//   // Add return leg if it's a round trip (overall trip)
//   if (tripData.returnDepartureDateLeg2) {
//     stops.push({
//       time: format(new Date(tripData.returnDepartureDateLeg2), 'HH:mm'),
//       date: format(new Date(tripData.returnDepartureDateLeg2), 'EEE, d MMM yy'),
//       city: tripData.departureCityLeg1,
//       name: generateFlightName(tripData.arrivalCityLeg1, tripData.departureCityLeg1),
//       active: false,
//       type: 'flight',
//     });
//   }

//   return stops;
// };

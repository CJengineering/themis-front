import { format } from 'date-fns';
import { Stop, TripData } from '@/interfaces'; // Ensure to define Stop interface accordingly

export const mapTripToStops = (trip: TripData): Stop[] => {
  const stops: Stop[] = [];

  // Map flights to stops
  trip.flights.forEach((flight) => {
    // Outbound flight
    if (flight.departureDate) {
      stops.push({
        type: 'flight',
        date: format(new Date(flight.departureDate), 'EEE, d MMM yy'),
        time: format(new Date(flight.departureDate), 'HH:mm'),
        city: flight.cityDeparture,
        name: `${flight.cityDeparture} to ${flight.cityArrival}`,
        status: flight.ticketImageUrl ? 'Booked' : 'Not Booked',
        active: false,
        flightTicket: {
          flightId: flight.id,
          departureDate: format(
            new Date(flight.departureDate),
            'EEE, d MMM yy'
          ),
          departureCity: flight.cityDeparture,
          arrivalDate: format(new Date(flight.departureDate), 'EEE, d MMM yy'),
          arrivalCity: flight.cityArrival,
          title: `${flight.cityDeparture} to ${flight.cityArrival}`,
          description: 'Flight Details',
        },
        accomodationDetails: {
          accommodationId: 1,
          hotelName: '',
          checkInDate: '',
          checkOutDate: '',
          city: '',
        },
      });
    }

    // Return flight if Round Trip
    if (flight.roundTrip && flight.returnDate) {
      stops.push({
        type: 'flight',
        date: format(new Date(flight.returnDate), 'EEE, d MMM yy'),
        time: format(new Date(flight.returnDate), 'HH:mm'),
        city: flight.cityArrival,
        name: `${flight.cityArrival} to ${flight.cityDeparture}`,
        status: flight.ticketImageUrl ? 'Booked' : 'Not Booked',
        active: false,
        flightTicket: {
          flightId: flight.id,
          departureDate: format(new Date(flight.returnDate), 'EEE, d MMM yy'),
          departureCity: flight.cityArrival,
          arrivalDate: format(new Date(flight.returnDate), 'EEE, d MMM yy'),
          arrivalCity: flight.cityDeparture,
          title: `${flight.cityArrival} to ${flight.cityDeparture}`,
          description: 'Flight Details',
        },
        accomodationDetails: {
          accommodationId: 1,
          hotelName: '',
          checkInDate: '',
          checkOutDate: '',
          city: '',
        },
      });
    }
  });

  // Map accommodations to stops
  trip.accommodations.forEach((accommodation) => {
    // Check-in stop
    stops.push({
      type: 'accommodation',
      date: format(new Date(accommodation.startDate), 'EEE, d MMM yy'),
      time: accommodation.checkInHour,
      city: accommodation.city,
      name: `Check-in at ${accommodation.hotelName}`,
      status: accommodation.bookingImageUrl ? 'Booked' : 'Not Booked',
      active: false,
      flightTicket: {
        flightId: 1,
        departureDate: format(
          new Date(accommodation.startDate),
          'EEE, d MMM yy'
        ),
        departureCity: accommodation.city,
        arrivalDate: format(new Date(accommodation.startDate), 'EEE, d MMM yy'),
        arrivalCity: accommodation.city,
        title: `Check-in at ${accommodation.hotelName}`,
        description: 'Accommodation Details',
      },
      accomodationDetails: {
        accommodationId: accommodation.id,
        hotelName: accommodation.hotelName,
        checkInDate: format(new Date(accommodation.startDate), 'EEE, d MMM yy'),
        checkOutDate: format(
          new Date(accommodation.leaveDate),
          'EEE, d MMM yy'
        ),
        city: accommodation.city,
      },
    });

    // Check-out stop
    stops.push({
      type: 'accommodation',
      date: format(new Date(accommodation.leaveDate), 'EEE, d MMM yy'),
      time: accommodation.checkOutHour,
      city: accommodation.city,
      name: `Check-out from ${accommodation.hotelName}`,
      status: accommodation.bookingImageUrl ? 'Booked' : 'Not Booked',
      active: false,
      flightTicket: {
        flightId: 1,
        departureDate: format(
          new Date(accommodation.leaveDate),
          'EEE, d MMM yy'
        ),
        departureCity: accommodation.city,
        arrivalDate: format(new Date(accommodation.leaveDate), 'EEE, d MMM yy'),
        arrivalCity: accommodation.city,
        title: `Check-out from ${accommodation.hotelName}`,
        description: 'Accommodation Details',
      },
      accomodationDetails: {
        accommodationId: accommodation.id,
        hotelName: accommodation.hotelName,
        checkInDate: format(new Date(accommodation.startDate), 'EEE, d MMM yy'),
        checkOutDate: format(
          new Date(accommodation.leaveDate),
          'EEE, d MMM yy'
        ),
        city: accommodation.city,
      },
    });
  });

  // Sort stops chronologically by date and time
  stops.sort((a, b) => {
    const dateA = new Date(`${a.date}`);
    const dateB = new Date(`${b.date}`);
    return dateA.getTime() - dateB.getTime();
  });

  return stops;
};

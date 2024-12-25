import { format } from 'date-fns';
import { Stop, TripData } from '@/interfaces'; // Ensure to define Stop interface accordingly

export const mapTripToStops = (trip: TripData): Stop[] => {
  const stops: Stop[] = [];
  console.log('Trip Data:', trip); // Log the entire trip object at the start

  // Validate required properties in the trip object
  if (!trip.flights) {
    console.error('Flights data is missing or undefined.');
    trip.flights = [];
  }
  if (!trip.trainTickets) {
    console.error('Train tickets data is missing or undefined.');
    trip.trainTickets = [];
  }
  if (!trip.busTickets) {
    console.error('Bus tickets data is missing or undefined.');
    trip.busTickets = [];
  }
  if (!trip.accommodations) {
    console.error('Accommodations data is missing or undefined.');
    trip.accommodations = [];
  }

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
          flightClass: flight.flightClass,
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
          pricePerNight: 0,
        },
        trainTicketDetails: {
          trainTicketId: 1,
          departureDate: '',
          returnDate: '',
          arrivalDate: '',
          departureCity: '',
          arrivalCity: '',
          trainClass: '1st Class',
          price: 0,
          description: '',
        },
        busTicketDetails: {
          busTicketId: 1,
          departureDate: '',
          arrivalDate: '',
          description: '',
          returnDate: '',
          departureCity: '',
          arrivalCity: '',
          price: 0,
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
          flightClass: flight.flightClass,
          arrivalCity: flight.cityDeparture,
          title: `${flight.cityArrival} to ${flight.cityDeparture}`,
          description: 'Flight Details',
        },
        trainTicketDetails: {
          trainTicketId: 1,
          arrivalDate: '',
          departureDate: '',
          returnDate: '',
          departureCity: '',
          arrivalCity: '',
          trainClass: '1st Class',
          price: 0,
          description: '',
        },
        busTicketDetails: {
          busTicketId: 1,
          departureDate: '',
          arrivalDate: '',
          description: '',
          returnDate: '',
          departureCity: '',
          arrivalCity: '',
          price: 0,
        },
        accomodationDetails: {
          accommodationId: 1,
          hotelName: '',
          checkInDate: '',
          checkOutDate: '',
          city: '',
          pricePerNight: 0,
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
        flightClass: 'Economy',
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
        pricePerNight: accommodation.pricePerNight,
      },
      trainTicketDetails: {
        trainTicketId: 1,
        arrivalDate: '',
        departureDate: '',
        returnDate: '',
        departureCity: '',
        arrivalCity: '',
        trainClass: '1st Class',
        price: 0,
        description: '',
      },
      busTicketDetails: {
        busTicketId: 1,
        departureDate: '',
        arrivalDate: '',
        description: '',
        returnDate: '',
        departureCity: '',
        arrivalCity: '',
        price: 0,
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
        flightClass: 'Economy',
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
        pricePerNight: accommodation.pricePerNight,
      },
      trainTicketDetails: {
        trainTicketId: 1,
        departureDate: '',
        arrivalDate: '',
        returnDate: '',
        departureCity: '',
        arrivalCity: '',
        trainClass: '1st Class',
        price: 0,
        description: '',
      },
      busTicketDetails: {
        busTicketId: 1,
        arrivalDate: '',
        departureDate: '',
        description: '',
        returnDate: '',
        departureCity: '',
        arrivalCity: '',
        price: 0,
      },
    });
  });
  trip.trainTickets.forEach((trainTicket) => {
    // Outbound train
    stops.push({
      type: 'trainTickets',
      date: format(new Date(trainTicket.departureDate), 'EEE, d MMM yy'),
      time: format(new Date(trainTicket.departureDate), 'HH:mm'),
      city: trainTicket.cityDeparture,
      name: `${trainTicket.cityDeparture} to ${trainTicket.cityArrival}`,
      status: trainTicket.ticketImageUrl ? 'Booked' : 'Not Booked',
      active: false,
      trainTicketDetails: {
        trainTicketId: trainTicket.id,
        departureDate: format(
          new Date(trainTicket.departureDate),
          'EEE, d MMM yy'
        ),
        returnDate: trainTicket.returnDate
          ? format(new Date(trainTicket.returnDate), 'EEE, d MMM yy')
          : undefined,
        departureCity: trainTicket.cityDeparture,
        arrivalDate: format(
          new Date(trainTicket.departureDate),
          'EEE, d MMM yy'
        ),
        arrivalCity: trainTicket.cityArrival,
        trainClass: trainTicket.trainClass,
        description: 'Train Details',
        price: trainTicket.priceInUSD || 0,
      },
      accomodationDetails: {
        accommodationId: 1,
        hotelName: '',
        checkInDate: '',
        checkOutDate: '',
        city: '',
        pricePerNight: 0,
      },
      busTicketDetails: {
        busTicketId: 1,
        departureDate: '',
        arrivalDate: '',
        description: '',
        returnDate: '',
        departureCity: '',
        arrivalCity: '',
        price: 0,
      },
      flightTicket: {
        flightId: 1,
        flightClass: 'Economy',
        departureDate: format(
          new Date(trainTicket.departureDate),
          'EEE, d MMM yy'
        ),
        departureCity: trainTicket.cityDeparture,
        arrivalDate: format(
          new Date(trainTicket.departureDate),
          'EEE, d MMM yy'
        ),
        arrivalCity: trainTicket.cityArrival,
        title: `${trainTicket.cityDeparture} to ${trainTicket.cityArrival}`,
        description: 'Train Ticket Details',
      },
    });

    // Return train if Round Trip
    if (trainTicket.roundTrip && trainTicket.returnDate) {
      stops.push({
        type: 'trainTickets',
        date: format(new Date(trainTicket.returnDate), 'EEE, d MMM yy'),
        time: format(new Date(trainTicket.returnDate), 'HH:mm'),
        city: trainTicket.cityArrival,
        name: `${trainTicket.cityArrival} to ${trainTicket.cityDeparture}`,
        status: trainTicket.ticketImageUrl ? 'Booked' : 'Not Booked',
        active: false,
        trainTicketDetails: {
          trainTicketId: trainTicket.id,
          departureDate: format(
            new Date(trainTicket.returnDate),
            'EEE, d MMM yy'
          ),
          returnDate: format(new Date(trainTicket.returnDate), 'EEE, d MMM yy'),
          departureCity: trainTicket.cityArrival,
          arrivalCity: trainTicket.cityDeparture,
          arrivalDate: format(
            new Date(trainTicket.departureDate),
            'EEE, d MMM yy'
          ),
          trainClass: trainTicket.trainClass,
          description: 'Return Train Details',
          price: trainTicket.priceInUSD || 0,
        },
        accomodationDetails: {
          accommodationId: 1,
          hotelName: '',
          checkInDate: '',
          checkOutDate: '',
          city: '',
          pricePerNight: 0,
        },
        busTicketDetails: {
          busTicketId: 1,
          departureDate: '',
          description: '',
          arrivalDate: '',
          returnDate: '',
          departureCity: '',
          arrivalCity: '',
          price: 0,
        },
        flightTicket: {
          flightId: 1,
          flightClass: 'Economy',
          departureDate: format(
            new Date(trainTicket.returnDate),
            'EEE, d MMM yy'
          ),
          departureCity: trainTicket.cityArrival,
          arrivalDate: format(
            new Date(trainTicket.returnDate),
            'EEE, d MMM yy'
          ),
          arrivalCity: trainTicket.cityDeparture,
          title: `${trainTicket.cityArrival} to ${trainTicket.cityDeparture}`,
          description: 'Return Train Ticket Details',
        },
      });
    }
  });
  trip.busTickets.forEach((busTicket) => {
    // Outbound bus
    stops.push({
      type: 'busTickets',
      date: format(new Date(busTicket.departureDate), 'EEE, d MMM yy'),
      time: format(new Date(busTicket.departureDate), 'HH:mm'),
      city: busTicket.cityDeparture,
      name: `${busTicket.cityDeparture} to ${busTicket.cityArrival}`,
      status: busTicket.ticketImageUrl ? 'Booked' : 'Not Booked',
      active: false,
      busTicketDetails: {
        busTicketId: busTicket.id,
        departureDate: format(
          new Date(busTicket.departureDate),
          'EEE, d MMM yy'
        ),
        returnDate: busTicket.returnDate
          ? format(new Date(busTicket.returnDate), 'EEE, d MMM yy')
          : undefined,
        departureCity: busTicket.cityDeparture,
        arrivalCity: busTicket.cityArrival,
        arrivalDate: format(new Date(busTicket.departureDate), 'EEE, d MMM yy'),
        price: busTicket.priceInUSD || 0,
        description: 'Bus Details',
      },
      accomodationDetails: {
        accommodationId: 1,
        hotelName: '',
        checkInDate: '',
        checkOutDate: '',
        city: '',
        pricePerNight: 0,
      },
      trainTicketDetails: {
        trainTicketId: 1,
        departureDate: '',
        arrivalDate: '',
        returnDate: '',
        departureCity: '',
        arrivalCity: '',
        trainClass: '1st Class',
        price: 0,
        description: '',
      },
      flightTicket: {
        flightId: 1,
        flightClass: 'Economy',
        departureDate: format(new Date(), 'EEE, d MMM yy'),
        departureCity: '',
        arrivalDate: format(new Date(), 'EEE, d MMM yy'),
        arrivalCity: '',
        title: ``,
        description: 'Bus Ticket Details',
      },
    });

    // Return bus if Round Trip
    if (busTicket.roundTrip && busTicket.returnDate) {
      stops.push({
        type: 'busTickets',
        date: format(new Date(busTicket.returnDate), 'EEE, d MMM yy'),
        time: format(new Date(busTicket.returnDate), 'HH:mm'),
        city: busTicket.cityArrival,
        name: `${busTicket.cityArrival} to ${busTicket.cityDeparture}`,
        status: busTicket.ticketImageUrl ? 'Booked' : 'Not Booked',
        active: false,
        busTicketDetails: {
          busTicketId: busTicket.id,
          departureDate: format(
            new Date(busTicket.returnDate),
            'EEE, d MMM yy'
          ),
          returnDate: format(new Date(busTicket.returnDate), 'EEE, d MMM yy'),
          departureCity: busTicket.cityArrival,
          arrivalCity: busTicket.cityDeparture,
          arrivalDate: format(
            new Date(busTicket.departureDate),
            'EEE, d MMM yy'
          ),
          price: busTicket.priceInUSD || 0,
          description: 'Return Bus Details',
        },
        accomodationDetails: {
          accommodationId: 1,
          hotelName: '',
          checkInDate: '',
          checkOutDate: '',
          city: '',
          pricePerNight: 0,
        },
        trainTicketDetails: {
          trainTicketId: 1,
          departureDate: '',
          returnDate: '',
          arrivalDate: '',
          departureCity: '',
          arrivalCity: '',
          trainClass: '1st Class',
          price: 0,
          description: '',
        },
        flightTicket: {
          flightId: 1,
          flightClass: 'Economy',
          departureDate: format(
            new Date(busTicket.returnDate),
            'EEE, d MMM yy'
          ),
          departureCity: busTicket.cityArrival,
          arrivalDate: format(new Date(busTicket.returnDate), 'EEE, d MMM yy'),
          arrivalCity: busTicket.cityDeparture,
          title: `${busTicket.cityArrival} to ${busTicket.cityDeparture}`,
          description: 'Return Bus Ticket Details',
        },
      });
    }
  });
  // Sort stops chronologically by date and time
  stops.sort((a, b) => {
    const dateA = new Date(`${a.date}`);
    const dateB = new Date(`${b.date}`);
    return dateA.getTime() - dateB.getTime();
  });

  return stops;
};

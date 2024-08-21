import { string } from 'zod';
import { Travel, TravelData } from './type';

export type WithChildren<T = {}> = T & { children?: React.ReactNode };
export interface TravelGateway {
  fetchTravels(
    url: string,
    options: { id?: number; userId?: string; userRole?: string }
  ): Promise<TravelData[]>;
}
export interface TripGateway {
  fetchTrips(url: string,
    options: { id?: number; userId?: string; userRole?: string }):Promise<Trip[]>;
  }
export interface CityData {
  city: string;
}
export interface Transaction{
  amount: string;
  transactionDate: string;

}
export interface TripFieldData {
  name: string;
  userId: string;
  subject: string;
  status?: string;
  purpose: string;
  relatedProgramme?: string;
  departureDate: Date;
  returnDate?: Date;
  cityStart: string;
  cityEnd: string;
  transitionalCities: string[];
  daysOfStay: { city: string; days: number }[];
  flights: {
    id: number;
    cityDeparture: string;
    cityArrival: string;
    departureDate?: Date;
    price?: number;
    roundTrip: boolean;
    returnDate?: Date;
    ticketImageUrl?: string;
  }[];

  accommodations: {
    id: number;
    hotelName: string;
    startDate: Date;
    leaveDate: Date;
    city: string;
    checkInHour?: string;
    checkOutHour?: string;
    lateCheckOut: boolean;
    pricePerNight: number;
    totalPrice?: number;
    bookingImageUrl?: string;
  }[];
  expenses: {
    id: number;
    nature: string;
    amount: number;
    currency: string;
    receiptImageUrl?: string;
  }[];
}

export interface Trip {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  fieldData: TripFieldData;
}
export interface TripData {
  id: number;
  purpose: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  subject: string;
  userId: string;
  status?: string;
  relatedProgramme?: string;
  departureDate: Date;
  returnDate?: Date;
  cityStart: string;
  cityEnd: string;
  transitionalCities: string[];
  daysOfStay: { city: string; days: number }[];
  flights: {
    id: number;
    cityDeparture: string;
    cityArrival: string;
    departureDate?: Date;
    price?: number;
    roundTrip: boolean;
    returnDate?: Date;
    ticketImageUrl?: string;
  }[];
  accommodations: {
    id: number;
    hotelName: string;
    startDate: Date;
    leaveDate: Date;
    city: string;
    checkInHour?: string;
    checkOutHour?: string;
    lateCheckOut: boolean;
    pricePerNight: number;
    totalPrice?: number;
    bookingImageUrl?: string;
  }[];
  expenses: {
    id: number;
    nature: string;
    amount: number;
    currency: string;
    receiptImageUrl?: string;
  }[];
}

export interface TripRequest {
  name: string;
  userId: string;
  returnDepartureDateLeg2?: string; // ISO format date string
  notes?: string;
  tripType: string;
  purpose: string;
  departureCityLeg1: string;
  arrivalCityLeg1: string;
  departureDateLeg1: string; // ISO format date string
  flights: Flight2[];
  accommodations: Accommodation2[];
}
export interface Flight2 {
  departureCity: string;
  arrivalCity: string;
  departureDate: Date;
  tripType: string;
  returnDepartureDate?: Date;
};

export interface Accommodation2 {
  city: string;
  status: string;
  hotelName?: string;
}
// types.ts
export interface Stop {
  time?: string; // Optional because accommodations won't have a time
  date?: string; // Optional because accommodations won't have a date
  city: string;
  name?: string; // New field to store the abbreviated flight name
  active: boolean;
  type: 'flight' | 'accommodation'; // Added to distinguish between flight and accommodation
  accommodation?: {
    status: string;
    name?: string;
  };
}

export interface Expense {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: string;
  time: string;
}
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  officeLocation: string;
  position: string;
  email: string;
  profilePicUrl: string;
  visas: Visa[];
  miles: Mile[];
  passports: Passport[];
  [key: string]: any;
}
export interface Transaction{
  amount: string;
  transactionDate: string;
}
export interface Visa {
  endDate: string;
  id: number;
  userId: number;
  name: string;
  startDate: string;
  number: string;
}
export interface Mile {
  companyName: string;
  miles: number;
  id: number;
}
export interface Passport {
  dateOfBirth: string;
  expiry: string;
  id: number;
  passportNumber: string;
  userId: number;
  passportReference: string;
  validFrom: string;
  nationality: string;
  fileName?: string;
}
export interface UserGateway {
  fetchUser(url: string): Promise<User>;
}

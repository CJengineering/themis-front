import { string } from 'zod';
import { Travel, TravelData } from './type';

export type WithChildren<T = {}> = T & { children?: React.ReactNode };
export interface TravelGateway {
  fetchTravels(
    url: string,
    options: { id?: number; userId?: string; userRole?: string }
  ): Promise<TravelData[]>;
}

export interface CityData {
  city: string;
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
}
export interface UserGateway {
  fetchUser(url: string): Promise<User>;
}

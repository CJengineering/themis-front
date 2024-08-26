import { Travel, TravelData } from '@/type';
import { RootState } from './store';
import { TransitionEventHandler } from 'react';
import { Mile, Passport, Trip, TripData, User, Visa } from '@/interfaces';
import { Presentation } from 'lucide-react';

export type PresentationTravel = {
  travels: Record<number, TravelData>;
  ids: number[];
};
export type TravelRows = {
  id: number;
  status: string;
  name: string;
  userId: number;
  userFullName: string;
  tripType: boolean; // Assuming true represents 'Round Trip'
  departureCity: string;
  arrivalCity: string;
  departureDate: Date;
  returnDate: Date | null;
  costOriginal: number;
  originalCurrency: string;
  costUSD: number;
  bookingReferenceDocument: string;
  notes: string | null;
};
export const createPresentationUrl = (state: RootState): string => {
  const isProduction = state.url.isProduction;
  const presentationUrl = isProduction
    ? 'https://themis-e4f6j5kdsq-ew.a.run.app'
    : 'http://localhost:3000';
  //const presentationUrl = isProduction ?   'http://localhost:3000':'https://themis-e4f6j5kdsq-ew.a.run.app';
  return presentationUrl;
};
export const createPresentationUrl2 = (state: RootState): string => {
  const isProduction = state.url2.isProduction;
  const presentationUrl = isProduction
    ? 'https://themis-trip-e4f6j5kdsq-ew.a.run.app'
    : 'http://localhost:3000';
  //const presentationUrl = isProduction ?   'http://localhost:3000':'https://themis-e4f6j5kdsq-ew.a.run.app';
  return presentationUrl;
};
export const createPresentationDialog = (state: RootState): boolean => {
  const presentationDialog = state.dialog.isOpen;
  return presentationDialog;
};
export const createPresentationSecondDialog = (state: RootState): boolean => {
  const presentationSecondDialog = state.dialog.isSecondOpen;
  return presentationSecondDialog;
};
export const createPresentationTrip = (state: RootState): TripData[] => {
  const presentationTrip: TripData[] = [];
  const { ids, trips } = state.trip;

  ids.forEach((id) => {
    const trip = trips[id];
    if (!trip) return;

    presentationTrip.push({
      id: trip.id,
      createdAt: trip.createdAt,
      updatedAt: trip.updatedAt,
      name: trip.fieldData.name,
      subject: trip.fieldData.subject,
      purpose: trip.fieldData.purpose,
      status: trip.fieldData.status,
      firstName: trip.fieldData.firstName,
      lastName: trip.fieldData.lastName,
      email: trip.fieldData.email,
      userRole: trip.fieldData.userRole,
      userId: trip.fieldData.userId,
      priceTotal: trip.fieldData.priceTotal,
      priceTotalUSD: trip.fieldData.priceTotalUSD,
      priceTotalEUR: trip.fieldData.priceTotalEUR,
      priceTotalGBP: trip.fieldData.priceTotalGBP,
      priceTotalSAR: trip.fieldData.priceTotalSAR,
      relatedProgramme: trip.fieldData.relatedProgramme,
      departureDate: new Date(trip.fieldData.departureDate),
      returnDate: trip.fieldData.returnDate ? new Date(trip.fieldData.returnDate) : undefined,
      cityStart: trip.fieldData.cityStart,
      cityEnd: trip.fieldData.cityEnd,
      transitionalCities: trip.fieldData.transitionalCities,
      daysOfStay: trip.fieldData.daysOfStay,
      flights: trip.fieldData.flights,
      accommodations: trip.fieldData.accommodations,
      documents: trip.fieldData.documents,
      expenses: trip.fieldData.expenses,
    });
  });

  return presentationTrip;
};

export const createPresentationSingleTrip = (state: RootState): TripData => {
  const trip = state.trip.currentTrip;

  const presentationTrip: TripData = {
    id: trip.id,
    createdAt: trip.createdAt,
    updatedAt: trip.updatedAt,
    name: trip.fieldData.name,
    subject: trip.fieldData.subject,
    purpose: trip.fieldData.purpose,
    status: trip.fieldData.status,
    firstName: trip.fieldData.firstName,
    lastName: trip.fieldData.lastName,
    email: trip.fieldData.email,
    userRole: trip.fieldData.userRole,
    userId: trip.fieldData.userId,
    priceTotal: trip.fieldData.priceTotal,
    priceTotalUSD: trip.fieldData.priceTotalUSD,
    priceTotalEUR: trip.fieldData.priceTotalEUR,
    priceTotalGBP: trip.fieldData.priceTotalGBP,
    priceTotalSAR: trip.fieldData.priceTotalSAR,
    relatedProgramme: trip.fieldData.relatedProgramme,
    departureDate: new Date(trip.fieldData.departureDate),
    returnDate: trip.fieldData.returnDate ? new Date(trip.fieldData.returnDate) : undefined,
    cityStart: trip.fieldData.cityStart,
    cityEnd: trip.fieldData.cityEnd,
    transitionalCities: trip.fieldData.transitionalCities,
    daysOfStay: trip.fieldData.daysOfStay,
    flights: trip.fieldData.flights,
    accommodations: trip.fieldData.accommodations,
    documents: trip.fieldData.documents,
    expenses: trip.fieldData.expenses,
  };

  return presentationTrip;
};

export const createPrsentationTravel = (state: RootState): Travel[] => {
  const presentationTravel: Travel[] = [];
  const { ids, travels } = state.travel;

  ids.forEach((id) => {
    const travel = travels[id];
    if (!travel) return;

    presentationTravel.push({
      id: travel.id,
      status: travel.status ?? '',
      name: travel.name,
      userId: travel.userId,
      userFullName: `${travel.user.firstName} ${travel.user.lastName}`,
      tripType: !!travel.returnDepartureDateLeg2,
      departureCity: travel.departureCityLeg1,
      arrivalCity: travel.arrivalCityLeg1,
      departureDate: new Date(travel.departureDateLeg1),
      returnDate: travel.returnDepartureDateLeg2
        ? new Date(travel.returnDepartureDateLeg2)
        : null,
      costOriginal: travel.costOriginal ?? 0,
      originalCurrency: travel.originalCurrency ?? '',
      costUSD: travel.costUSD ?? 0,
      bookingReferenceDocument: travel.bookingReferenceDocument ?? '',
      notes: travel.notes ?? '',
      createdAt: new Date(travel.createdAt),
      updatedAt: new Date(travel.updatedAt),
    });
  });

  return presentationTravel;
};
export const createPresentationUser = (
  state: RootState
): {
  user: User;
  visas: Visa[];
  miles: Mile[];
  passports: Passport[];
} => {
  const user = state.user;

  return {
    user,
    visas: user.visas ?? [],
    miles: user.miles ?? [],
    passports: user.passports ?? [],
  };
};

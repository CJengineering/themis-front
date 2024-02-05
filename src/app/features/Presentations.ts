import { Travel, TravelData } from '@/type';
import { RootState } from './store';
import { TransitionEventHandler } from 'react';
import { Mile, Passport, User, Visa } from '@/interfaces';

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
  //const presentationUrl = isProduction ? 'https://themis-e4f6j5kdsq-ew.a.run.app' : 'http://localhost:3000';
  const presentationUrl = isProduction ?   'http://localhost:3000':'https://themis-e4f6j5kdsq-ew.a.run.app';
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

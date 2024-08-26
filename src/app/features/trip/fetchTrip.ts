import { UnknownAction, Dispatch, ThunkAction } from '@reduxjs/toolkit';
import { TravelGateway, TripGateway } from '@/interfaces';
import { AppState } from '../store';
import { tripFetched, tripSingleFetched } from './tripSlice';

type ThunkResult<D> = ThunkAction<void, AppState, D, UnknownAction>;

export const fetchTrips = (
  url: string,
  options: { id?: number; userId?: string; userRole?: string }
): ThunkResult<{ tripGateway: TripGateway }> => {
  return async (dispatch: Dispatch<any>, getState, { tripGateway }) => {
    const trips = await tripGateway.fetchTrips(url, options);
    dispatch(tripFetched(trips));
  };
};

export const fetchSingleTrip = (
  url: string
): ThunkResult<{ tripGateway: TripGateway }> => {
  return async (dispatch: Dispatch<any>, getState, { tripGateway }) => {
    const trip = await tripGateway.fetchSingleTrip(url);
    dispatch(tripSingleFetched(trip));
  };
};

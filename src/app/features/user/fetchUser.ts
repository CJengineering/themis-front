import { UnknownAction, Dispatch, ThunkAction } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { UserGateway } from '@/interfaces';
import { userFetched } from './userSlice';

type ThunkResult<D> = ThunkAction<void, AppState, D, UnknownAction>;

export const fetchUser = (url:string
): ThunkResult<{ userGateway: UserGateway }> => {
  return async (dispatch: Dispatch<any>, getState, { userGateway }) => {
    const user = await userGateway.fetchUser(url);
    dispatch(userFetched(user));
  };
};

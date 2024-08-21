import { combineReducers, configureStore } from '@reduxjs/toolkit';
import travelReducer from '../features/travel/travelSlice';
import tripReducer from '../features/trip/tripSlice';
import urlReducer from '../features/url/urlSlice';
import userReducer from '../features/user/userSlice';
import dialogReducer from '../features/openDialog/dialogSlice'; 
import { TravelGateway, UserGateway } from '@/interfaces';
import { ApiTravelGateway } from '@/app/features/travel/travelGateway';
import { ApiUserGateway } from './user/UserGateway';

export const rootReducer = combineReducers({
  travel: travelReducer,
  url: urlReducer,
  trip: tripReducer,
  dialog: dialogReducer,
  user: userReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const buildInitStore = (): AppState => ({
  travel: { ids: [], travels: {} },
  trip: { ids: [], trips: {} },
  url: { isProduction: true},
  dialog: { isOpen: true, isSecondOpen: false},
  user: { 
    id: -1, 
    firstName: '', 
    lastName: '', 
    role: '', 
    officeLocation: '', 
    position: '', 
    email: '', 
    profilePicUrl: '', 
    visas: [], 
    miles: [], 
    passports: [] 
  },
});
export const createStore = (dependencies: unknown, hydrate?: AppState) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: { extraArgument: dependencies } }),
    preloadedState: hydrate ?? buildInitStore(),
  });

const travelGateway: TravelGateway = new ApiTravelGateway();
const tripGateway: TravelGateway = new ApiTravelGateway();
const userGateway: UserGateway = new ApiUserGateway();

export const store = createStore({tripGateway, travelGateway, userGateway });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

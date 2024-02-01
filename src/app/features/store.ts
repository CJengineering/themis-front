import { combineReducers, configureStore } from '@reduxjs/toolkit';
import travelReducer from '../features/travel/travelSlice';
import urlReducer from '../features/url/urlSlice';
import userReducer from '../features/user/userSlice';
import dialogReducer from '../features/openDialog/dialogSlice'; 
import { TravelGateway, UserGateway } from '@/interfaces';
import { ApiTravelGateway } from '@/app/features/travel/travelGateway';
import { ApiUserGateway } from './user/UserGateway';

export const rootReducer = combineReducers({
  travel: travelReducer,
  url: urlReducer,
  dialog: dialogReducer,
  user: userReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const buildInitStore = (): AppState => ({
  travel: { ids: [], travels: {} },
  url: { isProduction: false },
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
const userGateway: UserGateway = new ApiUserGateway();

export const store = createStore({ travelGateway, userGateway });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

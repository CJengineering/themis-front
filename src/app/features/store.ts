import { combineReducers, configureStore } from '@reduxjs/toolkit';
import travelReducer from '../features/travel/travelSlice';
import urlReducer from '../features/url/urlSlice';
import dialogReducer from '../features/openDialog/dialogSlice'; 
import { TravelGateway } from '@/interfaces';
import { ApiTravelGateway } from '@/app/features/travel/travelGateway';

export const rootReducer = combineReducers({
  travel: travelReducer,
  url: urlReducer,
  dialog: dialogReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const buildInitStore = (): AppState => ({
  travel: { ids: [], travels: {} },
  url: { isProduction: false },
  dialog: { isOpen: true}
});
export const createStore = (dependencies: unknown, hydrate?: AppState) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: { extraArgument: dependencies } }),
    preloadedState: hydrate ?? buildInitStore(),
  });

const travelGateway: TravelGateway = new ApiTravelGateway();

export const store = createStore({ travelGateway });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

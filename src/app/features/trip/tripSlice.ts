import { Trip } from '@/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export const initialState: {
    ids: number[];
    trips: Record<number, Trip>;
  } = { ids: [], trips: {} };

  const tripSlice = createSlice({
    name: 'trip',
    initialState,
    reducers: {
        tripFetched: (state, action: PayloadAction<Trip[]>) => {
            const newTrips: Record<number, Trip>= {}
           for (const trip of action.payload) {
               newTrips[trip.id] = trip
           }
              state.trips = newTrips
              state.ids = action.payload.map((trip) => trip.id)
        }
    },
  }) 

  export const { tripFetched } = tripSlice.actions;
  export default tripSlice.reducer;
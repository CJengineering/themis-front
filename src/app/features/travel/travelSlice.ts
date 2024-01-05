import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Travel, TravelData} from "@/type";


export const initialState: {
    ids: number[];
    travels: Record<number, TravelData>;
  } = { ids: [], travels: {} };

  const travelSlice = createSlice({
    name: 'travel',
    initialState,
    reducers: {
        travelFetched: (state, action: PayloadAction<TravelData[]>) => {
            const newTravels: Record<number, TravelData>= {}
           for (const travel of action.payload) {
               newTravels[travel.id] = travel
           }
              state.travels = newTravels
              state.ids = action.payload.map((travel) => travel.id)
        }
    },
  }) 

  export const { travelFetched } = travelSlice.actions;
  export default travelSlice.reducer;
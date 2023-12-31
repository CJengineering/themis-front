import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Travel} from "@/type";


export const initialState: {
    ids: number[];
    travels: Record<number, Travel>;
  } = { ids: [], travels: {} };

  const travelSlice = createSlice({
    name: 'travel',
    initialState,
    reducers: {
        travelFetched: (state, action: PayloadAction<Travel[]>) => {
            const newTravels: Record<number, Travel>= {}
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
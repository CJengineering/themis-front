import { Trip } from '@/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export const defaultTrip: Trip = {
  id: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  fieldData: {
    name: '',
    subject: '',
    purpose: '',
    firstName: '',
    lastName: '',
    email: '',
    userRole: '',
    userId: '',
    priceTotal: 0,
    cityStart: '',
    cityEnd: '',
    transitionalCities: [],
    daysOfStay: [],
    flights: [],
    accommodations: [],
    expenses: [],
    departureDate: new Date(),
    // Add any other required fields with default values
  },
};

export const initialState: {
  ids: number[];
  currentTrip: Trip ; // Add currentTrip to store a single Trip
  trips: Record<number, Trip>;
} = { ids: [], trips: {}, currentTrip:defaultTrip };

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    tripFetched: (state, action: PayloadAction<Trip[]>) => {
      const newTrips: Record<number, Trip> = {};
      for (const trip of action.payload) {
        newTrips[trip.id] = trip;
      }
      state.trips = newTrips;
      state.ids = action.payload.map((trip) => trip.id);
    },
    tripSingleFetched: (state, action: PayloadAction<Trip>) => {
      state.currentTrip = action.payload;
    },
  },
});

export const { tripFetched, tripSingleFetched } = tripSlice.actions;
export default tripSlice.reducer;

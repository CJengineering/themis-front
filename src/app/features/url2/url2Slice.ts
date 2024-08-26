import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UrlState {
  isProduction: boolean;
}

const initialState: UrlState = {
  isProduction: false,
};

export const url2Slice = createSlice({
  name: 'url2',
  initialState,
  reducers: {
    toggleEnvironment: (state) => {
      state.isProduction = !state.isProduction;
    },
  },
});

export const { toggleEnvironment } = url2Slice.actions;

interface AppState {
  url2: UrlState;
}

export const selectUrl2 = (state: AppState) =>
  state.url2.isProduction ? 'https://themis-trip-e4f6j5kdsq-ew.a.run.app' : 'http://localhost:3000';

export default url2Slice.reducer;

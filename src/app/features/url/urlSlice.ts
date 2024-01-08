import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UrlState {
  isProduction: boolean;
}

const initialState: UrlState = {
  isProduction: false,
};

export const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    toggleEnvironment: (state) => {
      state.isProduction = !state.isProduction;
    },
  },
});

export const { toggleEnvironment } = urlSlice.actions;

interface AppState {
  url: UrlState;
}

export const selectUrl = (state: AppState) =>
  state.url.isProduction ?   'http://localhost:3000':'https://themis-e4f6j5kdsq-ew.a.run.app';

export default urlSlice.reducer;

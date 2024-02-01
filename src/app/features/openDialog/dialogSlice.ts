import { createSlice } from '@reduxjs/toolkit';

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState: {
    isOpen: false,
    isSecondOpen: false,
  },
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
   toggleSecond: (state) => {
        state.isSecondOpen = !state.isSecondOpen;
        },
    openDialog: (state) => {
      state.isOpen = true;
    },
    closeDialog: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggle, openDialog, closeDialog, toggleSecond } = dialogSlice.actions;

export default dialogSlice.reducer;

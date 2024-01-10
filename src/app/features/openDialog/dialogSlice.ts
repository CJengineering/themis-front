import { createSlice } from '@reduxjs/toolkit';

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
    openDialog: (state) => {
      state.isOpen = true;
    },
    closeDialog: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggle, openDialog, closeDialog } = dialogSlice.actions;

export default dialogSlice.reducer;

import { User } from '@/interfaces';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Assuming the User interface is structured as described earlier,
// the initialState should directly represent a User, without nesting inside a 'user' field.
export const initialState: User = {
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
  passports: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   
    userFetched: (state, action: PayloadAction<User>) => {
      return action.payload; 
    },
  },
});

export const { userFetched } = userSlice.actions;

export default userSlice.reducer;

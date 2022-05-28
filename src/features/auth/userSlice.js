import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  token: null,
  name: null,
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.name = action.payload.name;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.name = null;
    },
  },
});

export const userReducer = userSlice.reducer;

export const { setUser, removeUser } = userSlice.actions;

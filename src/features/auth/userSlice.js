import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  token: null,
  id: null,
  nickname: null,
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.nickname = action.payload.nickname;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.nickname = null;
    },
  },
});

export const userReducer = userSlice.reducer;

export const { setUser, removeUser } = userSlice.actions;

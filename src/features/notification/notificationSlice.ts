import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: '',
  isShown: false,
  text: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return (state = action.payload);
    },
    closeNotification: (state, action) => {
      state.isShown = action.payload;
    },
  },
});

export const notificationReducer = notificationSlice.reducer;
export const { setNotification, closeNotification } = notificationSlice.actions;

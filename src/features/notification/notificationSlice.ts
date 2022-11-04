import { createSlice } from '@reduxjs/toolkit';
import { IState } from '../../@types/state';

const initialState = {
  type: '',
  isShown: false,
  text: ''
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.text = action.payload.text;
      state.type = action.payload.type;
      state.isShown = true;
    },
    closeNotification: (state) => {
      state.isShown = false;
    }
  }
});

export const notificationReducer = notificationSlice.reducer;
export const { setNotification, closeNotification } = notificationSlice.actions;

// selectors
export const selectNotification = (state: IState) => state.notification;

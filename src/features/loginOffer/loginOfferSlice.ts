import { createSlice } from '@reduxjs/toolkit';
import { IState } from '../../@types/state';

const LoginPopupOfferSlice = createSlice({
  name: 'login-popup-offer',
  initialState: false,
  reducers: {
    setLoginOffer: (_, action) => action.payload
  }
});

export const LoginPopupOfferReducer = LoginPopupOfferSlice.reducer;
export const { setLoginOffer } = LoginPopupOfferSlice.actions;

// selectors
export const selectLoginPopup = (state: IState) => state.loginPopup;

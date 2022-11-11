import { createSlice } from '@reduxjs/toolkit';

import { IState, IUserData } from '../../@types/state';

const initialState: IUserData = {
  userData: {
    name: '',
    email: '',
    description: '',
    country: '',
    imageUrl: ''
    // socialMedia: []
  },
  favoriteContent: [],
  waitingContent: [],
  lists: [],
  reviews: []
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    setEmailAndName: (state, action) => {
      state.userData.email = action.payload.email;
      state.userData.name = action.payload.name;
    },
    removeUser: () => initialState,
    updateLists: (state, action) => {
      state.lists = action.payload;
    },
    updateFavoriteContent: (state, action) => {
      state.favoriteContent = action.payload;
    },
    updateWaitingContent: (state, action) => {
      state.waitingContent = action.payload;
    },
    updateReviws: (state, action) => {
      state.reviews = action.payload;
    }
  }
});

export const userReducer = userSlice.reducer;

export const {
  setUser,
  removeUser,
  setEmailAndName,
  updateLists,
  updateFavoriteContent,
  updateWaitingContent,
  updateReviws
} = userSlice.actions;

// selectors
export const selectUser = (state: IState) => state.user;
export const selectUserData = (state: IState) => state.user.userData;
export const selectUserFavorite = (state: IState) => state.user.favoriteContent;
export const selectUserWaiting = (state: IState) => state.user.waitingContent;
export const selectUserLists = (state: IState) => state.user.lists;
export const selectUserReviews = (state: IState) => state.user.reviews;

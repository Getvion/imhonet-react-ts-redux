import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: {
    name: '',
    email: '',
    description: '',
    county: '',
    imageUrl: '',
    socialMedia: []
  },
  favoriteContent: [],
  waitingContent: [],
  lists: []
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // eslint-disable-next-line no-return-assign
    setUser: (state, action) => (state = action.payload),
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
    }
  }
});

export const userReducer = userSlice.reducer;

export const { setUser, removeUser, setEmailAndName, updateLists, updateFavoriteContent, updateWaitingContent } =
  userSlice.actions;

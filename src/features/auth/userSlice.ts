import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: {
    name: '',
    email: '',
    description: '',
    birthday: '',
    county: '',
    imageUrl: '',
    socialMedia: [],
  },
  favoriteContent: { games: [], movies: [], shows: [], books: [] },
  waitingContent: { games: [], movies: [], shows: [], books: [] },
  lists: [],
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return (state = action.payload);
    },
    setEmailAndName: (state, action) => {
      state.userData.email = action.payload.email;
      state.userData.name = action.payload.name;
    },
    removeUser: () => initialState,
    updateLists: (state, action) => {
      state.lists = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;

export const { setUser, removeUser, setEmailAndName, updateLists } = userSlice.actions;

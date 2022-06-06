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
  lists: { movies: [], games: [], shows: [], books: [] },
};

// todo сделать много разных редюсеров, которые будут обновлять отдельные части стейта, например setEmailAndName меняет только поля email и name
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
  },
});

export const userReducer = userSlice.reducer;

export const { setUser, removeUser, setEmailAndName } = userSlice.actions;

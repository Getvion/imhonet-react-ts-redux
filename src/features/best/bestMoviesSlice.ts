import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { moviesRequests } from '../../requests/movies';

export const loadBestMovies = createAsyncThunk(
  'load-best-movies',
  async (movieId: number | string = 1) => moviesRequests.getBestMovies(movieId)
);

const initialState = {
  moviesList: []
};

const bestMovies = createSlice({
  name: 'bestMovies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadBestMovies.fulfilled, (state, action) => {
      state.moviesList = action.payload;
    });
  }
});

export const bestMoviesReducer = bestMovies.reducer;

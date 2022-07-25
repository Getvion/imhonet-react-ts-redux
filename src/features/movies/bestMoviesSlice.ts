import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadBestMovies = createAsyncThunk(
  'load-best-movies',
  async (_, { extra: { axios, requests } }: any) =>
    axios.get(requests.GET_BEST_MOVIES(1), {
      headers: {
        'X-API-KEY': requests.MOVIES_API_KEY
      }
    })
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
      state.moviesList = action.payload.data;
    });
  }
});

export const bestMoviesReducer = bestMovies.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadBestMovies = createAsyncThunk(
  'movies/load-best-movies',
  async (_, { extra: { client, requests } }) => {
    return client.get(requests.GET_BEST_MOVIES(1), {
      headers: {
        'X-API-KEY': requests.MOVIES_API_KEY,
      },
    });
  }
);

const initialState = {
  moviesList: [],
  status: 'idle',
  error: null,
};

const bestMovies = createSlice({
  name: 'bestMovies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadBestMovies.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadBestMovies.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })
      .addCase(loadBestMovies.fulfilled, (state, action) => {
        state.status = 'recieved';
        state.moviesList = action.payload.data;
      });
  },
});

export const bestMoviesReducer = bestMovies.reducer;

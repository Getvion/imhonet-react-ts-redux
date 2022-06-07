import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadMovieInfo = createAsyncThunk(
  'load-movie-info',
  async (filmId: number | string, { extra: { axios, requests } }: any) => {
    return await axios.get(requests.GET_MOVIE_INFO_BY_ID(filmId), {
      headers: {
        'X-API-KEY': requests.MOVIES_API_KEY,
      },
    });
  }
);

const initialState = {
  movieData: {},
};

const movieInfo = createSlice({
  name: 'movieInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadMovieInfo.fulfilled, (state, action) => {
      state.movieData = action.payload.data;
    });
  },
});

export const movieInfoReducer = movieInfo.reducer;

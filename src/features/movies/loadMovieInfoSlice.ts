import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadMovieInfo = createAsyncThunk(
  'load-movie-info',
  async (filmId: number | string, { extra: { axios, requests } }: any) =>
    axios.get(requests.GET_MOVIE_INFO_BY_ID(filmId), {
      headers: {
        'X-API-KEY': requests.MOVIES_API_KEY
      }
    })
);

const movieInfo = createSlice({
  name: 'movieInfo',
  initialState: {},
  reducers: {
    emptyMovieState: () => {}
  },
  extraReducers: (builder) => {
    builder.addCase(loadMovieInfo.fulfilled, (state, action) => action.payload.data);
  }
});

export const movieInfoReducer = movieInfo.reducer;
export const { emptyMovieState } = movieInfo.actions;

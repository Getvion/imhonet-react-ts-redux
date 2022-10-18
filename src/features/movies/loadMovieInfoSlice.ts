import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { moviesRequests } from '../../requests/movies';

export const loadMovieInfo = createAsyncThunk('load-movie-info', async (filmId: number | string) =>
  moviesRequests.getMovieInfoByID(filmId)
);

const movieInfo = createSlice({
  name: 'movieInfo',
  initialState: {},
  reducers: {
    emptyMovieState: () => {}
  },
  extraReducers: (builder) => {
    builder.addCase(loadMovieInfo.fulfilled, (state, action) => action.payload);
  }
});

export const movieInfoReducer = movieInfo.reducer;
export const { emptyMovieState } = movieInfo.actions;

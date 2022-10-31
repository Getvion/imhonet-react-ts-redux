import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IItemInfo } from '../../@types/state';

import { gamesRequests } from '../../requests/games';
import { moviesRequests } from '../../requests/movies';
import { showsRequests } from '../../requests/shows';
import { booksRequests } from '../../requests/books';

export const loadGameInfo = createAsyncThunk('load-game-info', async (gameId: number | string) =>
  gamesRequests.getGameInfoByID(gameId)
);

export const loadMovieInfo = createAsyncThunk('load-movie-info', async (filmId: number | string) =>
  moviesRequests.getMovieInfoByID(filmId)
);

export const loadShowsInfo = createAsyncThunk('load-show-info', async (showId: number | string) =>
  showsRequests.getShowInfoByID(showId)
);

export const loadBookInfo = createAsyncThunk('load-book-info', async (showId: number | string) =>
  booksRequests.getBookInfoByID(showId)
);

const initialState: IItemInfo = {
  id: 0,
  name: '',
  nameOriginal: '',
  posterUrl: '',
  year: '',
  genres: [],
  rating1: 0,
  rating2: 0,
  description: '',
  filmLength: 0,
  countries: [],
  publishers: [],
  developers: [],
  achievementsCount: 0,
  platforms: [],
  ageRating: ''
};

const pageDetails = createSlice({
  name: 'page-details',
  initialState,
  reducers: {
    emptyPageState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadGameInfo.fulfilled, (state, action) => action.payload)
      .addCase(loadMovieInfo.fulfilled, (state, action) => action.payload)
      .addCase(loadShowsInfo.fulfilled, (state, action) => action.payload)
      .addCase(loadBookInfo.fulfilled, (state, action) => action.payload);
  }
});

export const pageDetailsReducer = pageDetails.reducer;
export const { emptyPageState } = pageDetails.actions;

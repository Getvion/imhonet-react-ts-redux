import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ISearch, IState } from '../../@types/state';

import { gamesRequests } from '../../requests/games';
import { moviesRequests } from '../../requests/movies';

export const searchGamesByName = createAsyncThunk('load-search-games', async (gameQuery: string) =>
  gamesRequests.searchGameByName(gameQuery)
);

export const searchMoviesByName = createAsyncThunk(
  'load-search-movies',
  async (moviesQuery: string) => moviesRequests.searchMovieByName(moviesQuery)
);

const initialState: ISearch = {
  searchInputValue: '',
  games: { results: [], isLoaded: false, isError: '' },
  movies: { results: [], isLoaded: false, isError: '' },
  shows: { results: [], isLoaded: false, isError: '' },
  books: { results: [], isLoaded: false, isError: '' }
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.searchInputValue = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchGamesByName.fulfilled, (state, action) => {
        state.games.results = action.payload;
        state.games.isLoaded = true;
        state.games.isError = '';
      })
      .addCase(searchGamesByName.pending, (state) => {
        state.games.isLoaded = false;
        state.games.isError = '';
      })
      .addCase(searchGamesByName.rejected, (state) => {
        state.games.results = [];
        state.games.isError = 'Произошла ошибка во время поиска, попробуйте снова';
        state.games.isLoaded = true;
      })
      .addCase(searchMoviesByName.fulfilled, (state, action) => {
        state.movies.results = action.payload;
        state.movies.isLoaded = true;
        state.movies.isError = '';
      })
      .addCase(searchMoviesByName.pending, (state) => {
        state.movies.isLoaded = false;
      })
      .addCase(searchMoviesByName.rejected, (state) => {
        state.movies.results = [];
        state.movies.isLoaded = true;
        state.movies.isError = 'Произошла ошибка во время поиска, попробуйте снова';
      });
  }
});

export const searchReducer = searchSlice.reducer;
export const { setSearch } = searchSlice.actions;

// selectors
export const selectSearchValue = (state: IState) => state.search.searchInputValue;
export const selectSearchBooks = (state: IState) => state.search.books;
export const selectSearchGames = (state: IState) => state.search.games;
export const selectSearchMovies = (state: IState) => state.search.movies;
export const selectSearchShows = (state: IState) => state.search.shows;
export const selectSearchContent = (state: IState) => state.search;

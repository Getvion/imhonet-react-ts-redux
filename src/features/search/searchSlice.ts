import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ISearch, IState } from '../../@types/state';

import { gamesRequests } from '../../requests/games';
import { moviesRequests } from '../../requests/movies';
import { showsRequests } from '../../requests/shows';
import { booksRequests } from '../../requests/books';

export const searchGamesByName = createAsyncThunk('load-search-games', async (gameQuery: string) =>
  gamesRequests.searchGameByName(gameQuery)
);

export const searchMoviesByName = createAsyncThunk(
  'load-search-movies',
  async (moviesQuery: string) => moviesRequests.searchMovieByName(moviesQuery)
);

export const searchShowsByName = createAsyncThunk('load-search-shows', async (showQuery: string) =>
  showsRequests.searchShowsByName(showQuery)
);

export const searchBooksByName = createAsyncThunk('load-search-books', async (bookQuery: string) =>
  booksRequests.searchBooksByName(bookQuery)
);

const initialState: ISearch = {
  searchInputValue: '',
  isError: '',
  games: { results: [], isLoaded: false },
  movies: { results: [], isLoaded: false },
  shows: { results: [], isLoaded: false },
  books: { results: [], isLoaded: false }
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
        state.isError = '';
      })
      .addCase(searchGamesByName.pending, (state) => {
        state.games.isLoaded = false;
        state.isError = '';
      })
      .addCase(searchGamesByName.rejected, (state) => {
        state.games.results = [];
        state.games.isLoaded = true;
        state.isError = 'Произошла ошибка во время поиска, попробуйте снова';
      })
      .addCase(searchMoviesByName.fulfilled, (state, action) => {
        state.movies.results = action.payload;
        state.movies.isLoaded = true;
        state.isError = '';
      })
      .addCase(searchMoviesByName.pending, (state) => {
        state.movies.isLoaded = false;
      })
      .addCase(searchMoviesByName.rejected, (state) => {
        state.movies.results = [];
        state.movies.isLoaded = true;
        state.isError = 'Произошла ошибка во время поиска, попробуйте снова';
      })
      .addCase(searchShowsByName.fulfilled, (state, action) => {
        state.shows.results = action.payload;
        state.shows.isLoaded = true;
        state.isError = '';
      })
      .addCase(searchShowsByName.pending, (state) => {
        state.shows.isLoaded = false;
      })
      .addCase(searchShowsByName.rejected, (state) => {
        state.shows.results = [];
        state.shows.isLoaded = true;
        state.isError = 'Произошла ошибка во время поиска, попробуйте снова';
      })
      .addCase(searchBooksByName.fulfilled, (state, action) => {
        state.books.results = action.payload;
        state.books.isLoaded = true;
        state.isError = '';
      })
      .addCase(searchBooksByName.pending, (state) => {
        state.books.isLoaded = false;
      })
      .addCase(searchBooksByName.rejected, (state) => {
        state.books.results = [];
        state.books.isLoaded = true;
        state.isError = 'Произошла ошибка во время поиска, попробуйте снова';
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

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IBestContent, IState } from '../../@types/state';

import { gamesRequests } from '../../requests/games';
import { moviesRequests } from '../../requests/movies';
import { showsRequests } from '../../requests/shows';
import { booksRequests } from '../../requests/books';

export const loadBestGames = createAsyncThunk('load-best-games', async (pageNumber: string = '1') =>
  gamesRequests.getBestGames(pageNumber)
);

export const loadBestMovies = createAsyncThunk(
  'load-best-movies',
  async (pageNumber: string = '1') => moviesRequests.getBestMovies(pageNumber)
);

export const loadBestShows = createAsyncThunk('load-best-shows', async (pageNumber: string = '1') =>
  showsRequests.getBestShows(pageNumber)
);

export const loadBestBooks = createAsyncThunk('load-best-books', async (pageNumber: string = '1') =>
  booksRequests.getBestBooks(pageNumber)
);

const initialState: IBestContent = {
  games: { results: [], isLoaded: false, isError: '' },
  movies: { results: [], isLoaded: false, isError: '' },
  shows: { results: [], isLoaded: false, isError: '' },
  books: { results: [], isLoaded: false, isError: '' }
};

const bestContent = createSlice({
  name: 'best-content-slice',
  initialState,
  reducers: {
    emptyState: () => initialState,
    emptyGamesState: (state) => {
      state.games = initialState.games;
    },
    emptyMoviesState: (state) => {
      state.movies = initialState.movies;
    },
    emptyBooksState: (state) => {
      state.books = initialState.books;
    },
    emptyShowsState: (state) => {
      state.shows = initialState.shows;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBestGames.fulfilled, (state, action) => {
        state.games.results = action.payload;
        state.games.isLoaded = true;
        state.games.isError = '';
      })
      .addCase(loadBestGames.pending, (state) => {
        state.games.isLoaded = false;
        state.games.isError = '';
      })
      .addCase(loadBestGames.rejected, (state) => {
        state.games.results = [];
        state.games.isError = 'Произошла ошибка, попробуйте снова';
        state.games.isLoaded = true;
      })
      .addCase(loadBestMovies.fulfilled, (state, action) => {
        state.movies.results = action.payload;
        state.movies.isLoaded = true;
        state.movies.isError = '';
      })
      .addCase(loadBestMovies.pending, (state) => {
        state.movies.isLoaded = false;
        state.movies.isError = '';
      })
      .addCase(loadBestMovies.rejected, (state) => {
        state.movies.results = [];
        state.movies.isError = 'Прозошла ошибка, попробуйте снова';
        state.movies.isLoaded = true;
      })
      .addCase(loadBestShows.fulfilled, (state, action) => {
        state.shows.results = action.payload;
        state.shows.isLoaded = true;
        state.shows.isError = '';
      })
      .addCase(loadBestShows.pending, (state) => {
        state.shows.isLoaded = false;
        state.shows.isError = '';
      })
      .addCase(loadBestShows.rejected, (state) => {
        state.shows.results = [];
        state.shows.isError = 'Прозошла ошибка, попробуйте снова';
        state.shows.isLoaded = true;
      })
      .addCase(loadBestBooks.fulfilled, (state, action) => {
        state.books.results = action.payload;
        state.books.isLoaded = true;
        state.books.isError = '';
      })
      .addCase(loadBestBooks.pending, (state) => {
        state.books.isLoaded = false;
        state.books.isError = '';
      })
      .addCase(loadBestBooks.rejected, (state) => {
        state.books.results = [];
        state.books.isError = 'Прозошла ошибка, попробуйте снова';
        state.books.isLoaded = true;
      });
  }
});

export const bestContentReducer = bestContent.reducer;

export const { emptyBooksState, emptyGamesState, emptyMoviesState, emptyShowsState, emptyState } =
  bestContent.actions;

// selectors
export const selectBestBooks = (state: IState) => state.bestContent.books;
export const selectBestGames = (state: IState) => state.bestContent.games;
export const selectBestMovies = (state: IState) => state.bestContent.movies;
export const selectBestShows = (state: IState) => state.bestContent.shows;
export const selectBestContent = (state: IState) => state.bestContent;

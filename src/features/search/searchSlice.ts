import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { gamesRequests } from '../../requests/games';
import { moviesRequests } from '../../requests/movies';

export const searchGamesByName = createAsyncThunk('load-search-games', async (gameQuery: string) =>
  gamesRequests.searchGameByName(gameQuery)
);

export const searchMoviesByName = createAsyncThunk(
  'load-search-movies',
  async (moviesQuery: string) => moviesRequests.searchMovieByName(moviesQuery)
);

const initialState = {
  searchInputValue: '',
  games: { gamesSearch: [], isLoaded: false },
  movies: { moviesSearch: [], isLoaded: false },
  shows: { showsSearch: [], isLoaded: false },
  books: { booksSearch: [], isLoaded: false }
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
        state.games.gamesSearch = action.payload;
        state.games.isLoaded = true;
      })
      .addCase(searchGamesByName.pending, (state) => {
        state.games.isLoaded = false;
      })
      .addCase(searchMoviesByName.fulfilled, (state, action) => {
        state.movies.moviesSearch = action.payload;
        state.movies.isLoaded = true;
      })
      .addCase(searchMoviesByName.pending, (state) => {
        state.movies.isLoaded = false;
      });
  }
});

export const searchReducer = searchSlice.reducer;
export const { setSearch } = searchSlice.actions;

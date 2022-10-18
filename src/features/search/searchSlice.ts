import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { gamesRequests } from '../../requests/games';

export const searchGamesByName = createAsyncThunk('load-search-games', async (gameQuery: string) =>
  gamesRequests.searchGameByName(gameQuery)
);

export const searchMoviesByName = createAsyncThunk(
  'load-search-movies',
  async (movieQuery: string, { extra: { axios, requests } }: any) =>
    axios.get(requests.SEARCH_MOVIE_BY_NAME(movieQuery), {
      headers: {
        'X-API-KEY': requests.MOVIES_API_KEY
      }
    })
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
        state.movies.moviesSearch = action.payload.data;
        state.movies.isLoaded = true;
      })
      .addCase(searchMoviesByName.pending, (state) => {
        state.movies.isLoaded = false;
      });
  }
});

export const searchReducer = searchSlice.reducer;
export const { setSearch } = searchSlice.actions;

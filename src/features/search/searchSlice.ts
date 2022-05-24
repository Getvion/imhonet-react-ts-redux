import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const searchGamesByName = createAsyncThunk(
  'load-search-games',
  async (gameQuery: string, { extra: { axios, requests } }: any) => {
    return await axios.get(requests.SEARCH_GAME_BY_NAME(gameQuery));
  }
);

export const searchMoviesByName = createAsyncThunk(
  'load-search-movies',
  async (movieQuery: string, { extra: { axios, requests } }: any) => {
    return await axios.get(requests.SEARCH_MOVIE_BY_NAME(movieQuery), {
      headers: {
        'X-API-KEY': requests.MOVIES_API_KEY,
      },
    });
  }
);

const initialState = {
  searchInputValue: '',
  gamesSearch: [],
  moviesSearch: [],
  showsSearch: [],
  booksSearch: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.searchInputValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchGamesByName.fulfilled, (state, action) => {
        state.gamesSearch = action.payload.data;
      })
      .addCase(searchMoviesByName.fulfilled, (state, action) => {
        state.moviesSearch = action.payload.data;
      });
  },
});

export const searchReducer = searchSlice.reducer;
export const { setSearch } = searchSlice.actions;

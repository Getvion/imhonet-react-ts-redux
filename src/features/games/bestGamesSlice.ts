import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadBestGames = createAsyncThunk(
  'load-best-games',
  async (_, { extra: { axios, requests } }: any) => axios.get(requests.GET_BEST_GAMES(1))
);

const initialState = {
  gamesList: []
};

const bestGames = createSlice({
  name: 'bestGames',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadBestGames.fulfilled, (state, action) => {
      state.gamesList = action.payload.data;
    });
  }
});

export const bestGamesReducer = bestGames.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IBestGames } from '../../@types/state';

import { gamesRequests } from '../../requests/games';

export const loadBestGames = createAsyncThunk(
  'load-best-games',
  async (gameId: number | string = 1) => gamesRequests.getBestGames(gameId)
);

const initialState: IBestGames = {
  next: '',
  previous: '',
  results: []
};

const bestGames = createSlice({
  name: 'bestGames',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadBestGames.fulfilled, (state, action) => action.payload);
  }
});

export const bestGamesReducer = bestGames.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { gamesRequests } from '../../requests/games';

export const loadGameInfo = createAsyncThunk('load-game-info', async (gameId: number | string) =>
  gamesRequests.getGameInfoByID(gameId)
);

const gameInfo = createSlice({
  name: 'movieInfo',
  initialState: {},
  reducers: {
    emptyGameState: () => {}
  },
  extraReducers: (builder) => {
    builder.addCase(loadGameInfo.fulfilled, (_, action) => action.payload);
  }
});

export const gameInfoReducer = gameInfo.reducer;
export const { emptyGameState } = gameInfo.actions;

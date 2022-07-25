import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadGameInfo = createAsyncThunk(
  'load-game-info',
  async (gameId: number | string, { extra: { axios, requests } }: any) =>
    axios.get(requests.GET_GAME_INFO_BY_ID(gameId), {})
);

const gameInfo = createSlice({
  name: 'movieInfo',
  initialState: {},
  reducers: {
    emptyGameState: () => {}
  },
  extraReducers: (builder) => {
    builder.addCase(loadGameInfo.fulfilled, (_, action) => action.payload.data);
  }
});

export const gameInfoReducer = gameInfo.reducer;
export const { emptyGameState } = gameInfo.actions;

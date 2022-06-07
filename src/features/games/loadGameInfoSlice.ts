import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadGameInfo = createAsyncThunk(
  'load-game-info',
  async (gameId: number | string, { extra: { axios, requests } }: any) => {
    return await axios.get(requests.GET_GAME_INFO_BY_ID(gameId), {});
  }
);

const initialState = {
  gameData: {},
  gameStaffData: [],
  gameSimilar: {},
};

const gameInfo = createSlice({
  name: 'movieInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadGameInfo.fulfilled, (state, action) => {
      state.gameData = action.payload.data;
    });
  },
});

export const gameInfoReducer = gameInfo.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadBestGames = createAsyncThunk(
  'games/load-best-games',
  async (_, { extra: { client, requests } }) => {
    return client.get(requests.GET_BEST_GAMES(1));
  }
);

const initialState = {
  gamesList: [],
  status: 'idle',
  error: null,
};

const bestGames = createSlice({
  name: 'bestGames',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadBestGames.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadBestGames.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })
      .addCase(loadBestGames.fulfilled, (state, action) => {
        state.status = 'recieved';
        state.gamesList = action.payload.data;
      });
  },
});

export const bestGamesReducer = bestGames.reducer;

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import {
  theme,
  bestMovies,
  bestGames,
  movieInfo,
  user,
  gameInfo,
  search,
  loginPopup,
  notification,
  listsCatalog
} from './features';

export const store = configureStore({
  reducer: {
    theme,
    bestGames,
    bestMovies,
    movieInfo,
    gameInfo,
    user,
    search,
    loginPopup,
    notification,
    listsCatalog
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

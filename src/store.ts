import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import axios from 'axios';

import * as requests from './config';

import { themeReducer } from './features/theme/themeSlice';
import { bestGamesReducer } from './features/games/bestGamesSlice';
import { bestMoviesReducer } from './features/movies/bestMoviesSlice';
import { movieInfoReducer } from './features/movies/loadMovieInfoSlice';
import { userReducer } from './features/auth/userSlice';
import { gameInfoReducer } from './features/games/loadGameInfoSlice';
import { searchReducer } from './features/search/searchSlice';
import { LoginPopupOfferReducer } from './features/loginOffer/loginOfferSlice';
import { notificationReducer } from './features/notification/notificationSlice';
import { listsCatalogReducer } from './features/listsCatalog/listsCatalogSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    bestGames: bestGamesReducer,
    bestMovies: bestMoviesReducer,
    movieInfo: movieInfoReducer,
    user: userReducer,
    gameInfo: gameInfoReducer,
    search: searchReducer,
    showLoginPopup: LoginPopupOfferReducer,
    notification: notificationReducer,
    listsCatalog: listsCatalogReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          axios,
          requests,
        },
      },
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

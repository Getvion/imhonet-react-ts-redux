import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import axios from 'axios';

import * as requests from './config';

import counterReducer from './features/counter/counterSlice';
import { themeReducer } from './features/theme/themeSlice';
import { bestGamesReducer } from './features/games/bestGamesSlice';
import { bestMoviesReducer } from './features/movies/bestMoviesSlice';
import { movieInfoReducer } from './features/movies/loadMovieInfo';
import { userReducer } from './features/auth/userSlice';
import { gameInfoReducer } from './features/games/loadGameInfo';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    theme: themeReducer,
    bestGames: bestGamesReducer,
    bestMovies: bestMoviesReducer,
    movieInfo: movieInfoReducer,
    user: userReducer,
    gameInfo: gameInfoReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          axios: axios,
          requests,
        },
      },
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

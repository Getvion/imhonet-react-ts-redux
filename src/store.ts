import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import axios from 'axios';

import * as requests from './config';

import counterReducer from './features/counter/counterSlice';
import { themeReducer } from './features/theme/themeSlice';
import { bestGamesReducer } from './features/games/bestGamesSlice';
import { bestMoviesReducer } from './features/movies/bestMoviesSlice';
import { movieInfoReducer } from './features/movies/loadMovieInfo';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    theme: themeReducer,
    bestGames: bestGamesReducer,
    bestMovies: bestMoviesReducer,
    movieInfo: movieInfoReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          client: axios,
          requests,
        },
      },
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

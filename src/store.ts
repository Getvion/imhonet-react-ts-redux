import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import {
  theme,
  bestContent,
  user,
  search,
  loginPopup,
  notification,
  listsCatalog,
  pageDetails
} from './features';

export const store = configureStore({
  reducer: {
    theme,
    bestContent,
    user,
    search,
    loginPopup,
    notification,
    listsCatalog,
    pageDetails
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

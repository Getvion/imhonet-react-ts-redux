import { createSlice } from '@reduxjs/toolkit';
import { IState } from '../../@types/state';

const themeSlice = createSlice({
  name: 'theme',
  initialState: 'light',
  reducers: {
    setTheme: (state, action) => action.payload
  }
});

export const { setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;

// selectors
export const selectTheme = (state: IState) => state.theme;

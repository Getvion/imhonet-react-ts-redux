import { createSlice } from '@reduxjs/toolkit';

const listsCatalogSlice = createSlice({
  name: 'listsCatalog',
  initialState: false,
  reducers: {
    setListCatalog: (_, action) => action.payload,
  },
});

export const listsCatalogReducer = listsCatalogSlice.reducer;
export const { setListCatalog } = listsCatalogSlice.actions;

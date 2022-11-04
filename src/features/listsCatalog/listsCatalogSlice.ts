import { createSlice } from '@reduxjs/toolkit';
import { IState } from '../../@types/state';

const initialState = {
  isOpen: false,
  name: '',
  bgImg: '',
  id: 0,
  nameOrig: '',
  section: ''
};

const listsCatalogSlice = createSlice({
  name: 'listsCatalog',
  initialState,
  reducers: {
    setCatalogListOpen: (state, { payload }) => {
      state.isOpen = payload;
    },
    setCatalogListData: (state, { payload }) => {
      state.bgImg = payload.bgImg;
      state.id = payload.id;
      state.name = payload.name;
      state.nameOrig = payload.nameOrig;
      state.section = payload.section;
    }
  }
});

export const listsCatalogReducer = listsCatalogSlice.reducer;
export const { setCatalogListOpen, setCatalogListData } = listsCatalogSlice.actions;

// selectors
export const selectListsCatalog = (state: IState) => state.listsCatalog;

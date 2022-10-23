/* eslint-disable import/no-cycle */
import { IItemInfo } from './state';

export interface IAdd {
  title: string;
  sectionName: string;
  items: IItem[];
}

export interface IItem {
  id: number;
  name: string;
  nameOrig: string;
  bgImg: string;
  section: string;
}

// movies
export interface IMovieData {
  movieInfo: IItemInfo;
}

// games
export interface IGameInfo {
  gameInfo: IItemInfo;
}

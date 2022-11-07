import { IItem } from './intefaces';

export interface IState {
  theme: 'dark' | 'light';
  bestContent: IBestContent;
  user: IUserData;
  search: ISearch;
  loginPopup: boolean;
  notification: {
    type: 'warning' | 'success' | 'reject';
    isShown: boolean;
    text: string;
  };
  listsCatalog: IListsCatalog;
  pageDetails: IItemInfo;
}

export interface IRequestResult {
  posterUrl: string;
  genres: string[];
  id: number;
  name: string;
  rating1: number;
  rating2?: number;
  year: string;
  screenshots?: { imageUrl: string; id: number }[];
}

export interface IItemInfo {
  id: number;
  name: string;
  nameOriginal: string;
  posterUrl: string;
  year: string;
  genres: string[];
  rating1: number;
  rating2?: number;
  description: string;
  platforms?: string[];
  achievementsCount?: number;
  developers?: { name: string; imgUrl: string }[];
  publishers?: { name: string; imgUrl: string }[];
  countries?: string[];
  filmLength?: number;
  ageRating?: string;
  show?: { seasons: number };
  book?: { author: string[]; publisher: string };
}

export type IBestContent = {
  [key in 'movies' | 'games' | 'books' | 'shows']: {
    results: IRequestResult[];
    isLoaded: boolean;
    isError: string;
  };
};

export interface IUserData {
  userData: {
    email: string;
    name: string;
    imageUrl: string;
    country: string;
    description: string;
  };
  lists: { items: IItem[]; title: string; description: string }[];
  favoriteContent: { sectionName: string; title: string; items: IItem[] }[];
  waitingContent: { sectionName: string; title: string; items: IItem[] }[];
}

export interface ISearch {
  searchInputValue: string;
  isError: string;
  books: { isLoaded: boolean; results: IRequestResult[] };
  games: { isLoaded: boolean; results: IRequestResult[] };
  movies: { isLoaded: boolean; results: IRequestResult[] };
  shows: { isLoaded: boolean; results: IRequestResult[] };
}

export interface IListsCatalog {
  isOpen: boolean;
  name: string;
  bgImg: string;
  id: number;
  nameOrig: string;
  section: string;
}

/* eslint-disable import/no-cycle */
import { IItem } from './intefaces';
import { IBestMoviesRequest } from './requestInterfaces';

export interface IState {
  theme: 'dark' | 'light';
  bestGames: IBestGames;
  bestMovies: { moviesList: IBestMoviesRequest };
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

export interface IItemInfo {
  id: number;
  name: string;
  nameOriginal: string;
  posterUrl: string;
  year: string;
  genres: string[];
  rating1: number;
  rating2: number;
  description: string;
  platforms?: string[];
  achievementsCount?: number;
  developers?: { name: string; imgUrl: string }[];
  publishers?: { name: string; imgUrl: string }[];
  countries?: string[];
  filmLength?: number;
  ageRating: string;
}

export interface IBestGames {
  next: string;
  previous: string;
  results: {
    posterUrl: string;
    genres: string[];
    id: number;
    name: string;
    rating1: number;
    rating2: number;
    year: string;
    screenshots: { imageUrl: string; id: number }[];
  }[];
}

export interface IUserData {
  userData: {
    email: string;
    name: string;
    imageUrl: string;
    country: string;
    description: string;
  };
  lists: { items: IItem[]; title: string; description: string }[];
  favoriteContent: { title: string; items: IItem[] }[];
  waitingContent: { title: string; items: IItem[] }[];
}

export interface ISearch {
  searchInputValue: string;
  books: {
    isLoaded: boolean;
  };
  games: {
    isLoaded: boolean;
    gamesSearch: { results: { name: string; background_image: string; id: number }[] };
  };
  movies: {
    isLoaded: boolean;
    moviesSearch: {
      films: { filmId: number; posterUrlPreview: string; nameEn: string; nameRu: string }[];
    };
  };
  shows: {
    isLoaded: boolean;
  };
}

export interface IListsCatalog {
  isOpen: boolean;
  name: string;
  bgImg: string;
  id: number;
  nameOrig: string;
  section: string;
}

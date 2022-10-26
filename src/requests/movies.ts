import axios from 'axios';

import { IRequestResult, IItemInfo } from '../@types/state';
import {
  IBestMoviesRequest,
  IMovieRequest,
  ISearchMoviesRequest
} from '../@types/requestInterfaces';

export const MOVIES_API_KEY = '7dcd1d86-569b-4840-9c72-fa383b7b693a';

const moviesRequest = async <T>(requestString: string): Promise<T> => {
  const response = await axios.get(`https://kinopoiskapiunofficial.tech/api${requestString}`, {
    headers: { 'X-API-KEY': MOVIES_API_KEY }
  });

  return response.data;
};

const getMovieInfoByID = async (filmId: number | string): Promise<IItemInfo> => {
  const data = await moviesRequest<IMovieRequest>(`/v2.2/films/${filmId}`);

  return {
    id: data.kinopoiskId,
    name: data.nameRu,
    nameOriginal: data.nameOriginal,
    posterUrl: data.posterUrl,
    year: String(data.year),
    genres: data.genres.map((g) => g.genre),
    rating1: data.ratingKinopoisk,
    rating2: data.ratingImdb,
    description: data.description,
    countries: data.countries.map((c) => c.country),
    filmLength: data.filmLength,
    ageRating: data.ratingMpaa
  };
};

const getBestMovies = async (pageNumber: number | string): Promise<IRequestResult[]> => {
  const data = await moviesRequest<IBestMoviesRequest>(
    `/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${pageNumber}`
  );

  return [
    ...data.films.map((obj) => ({
      posterUrl: obj.posterUrl,
      genres: obj.genres.map((g) => g.genre),
      id: obj.filmId,
      rating1: Number(obj.rating),
      year: obj.year,
      name: obj.nameRu || obj.nameEn
    }))
  ];
};

const searchMovieByName = async (filmName: string): Promise<IRequestResult[]> => {
  const data = await moviesRequest<ISearchMoviesRequest>(
    `/v2.1/films/search-by-keyword?keyword=${filmName}`
  );

  return [
    ...data.films.map((obj) => ({
      posterUrl: obj.posterUrl,
      genres: obj.genres.map((g) => g.genre),
      id: obj.filmId,
      rating1: Number(obj.rating),
      year: obj.year,
      name: obj.nameRu || obj.nameEn
    }))
  ];
};

export const moviesRequests = {
  getBestMovies,
  getMovieInfoByID,
  searchMovieByName
};

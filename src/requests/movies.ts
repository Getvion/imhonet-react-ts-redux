import axios from 'axios';
import { IItemInfo, IMovie } from '../@types/intefaces';

//
export const MOVIES_BASE = 'https://kinopoiskapiunofficial.tech/api';
export const MOVIES_API_KEY = '7dcd1d86-569b-4840-9c72-fa383b7b693a';

const AUTH_HEADERS = { headers: { 'X-API-KEY': MOVIES_API_KEY } };

const moviesRequest = async <T>(requestString: string): Promise<T> => {
  const response = await axios.get(requestString, AUTH_HEADERS);

  return response.data;
};

const getBestMovies = async (pageNumber: number | string) => {
  const response = await axios.get(
    `${MOVIES_BASE}/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${pageNumber}`,
    AUTH_HEADERS
  );

  return response.data;
};

const getMovieInfoByID = async (filmId: number | string): Promise<IItemInfo> => {
  const data = await moviesRequest<IMovie>(`${MOVIES_BASE}/v2.2/films/${filmId}`);

  // console.log('init', data);

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

const searchMovieByName = async (filmName: string) => {
  const response = await axios.get(
    `${MOVIES_BASE}/v2.1/films/search-by-keyword?keyword=${filmName}`,
    AUTH_HEADERS
  );

  return response.data;
};

export const moviesRequests = {
  getBestMovies,
  getMovieInfoByID,
  searchMovieByName
};

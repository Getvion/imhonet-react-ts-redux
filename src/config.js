export const GAMES_BASE = 'https://api.rawg.io/api';
export const GAMES_API_KEY = '2d5893a4192a410486b36abbd099f4cb';

export const MOVIES_BASE = 'https://kinopoiskapiunofficial.tech/api';
export const MOVIES_API_KEY = '7dcd1d86-569b-4840-9c72-fa383b7b693a';

export const BASE_SHOWS = 'https://api.tvmaze.com';

export const GET_BEST_GAMES = (pageNumber) => {
  return `${GAMES_BASE}/games?key=${GAMES_API_KEY}&page=${pageNumber}`;
};

export const GET_BEST_MOVIES = (pageNumber) => {
  return `${MOVIES_BASE}/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${pageNumber}`;
};

export const GET_MOVIE_INFO_BY_ID = (filmId) => {
  return `https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmId}`;
};

export const GET_MOVIE_STAFF_INFO_BY_ID = (filmId) => {
  return `https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${filmId}`;
};

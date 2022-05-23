export const GAMES_BASE = 'https://api.rawg.io/api';
export const GAMES_API_KEY = 'key=2d5893a4192a410486b36abbd099f4cb';

export const BASE_SHOWS = 'https://api.tvmaze.com';

// games
export const GET_BEST_GAMES = (pageNumber) => {
  return `${GAMES_BASE}/games?${GAMES_API_KEY}&page=${pageNumber}`;
};

export const GET_GAME_INFO_BY_ID = (gameId) => {
  return `${GAMES_BASE}/games/${gameId}?${GAMES_API_KEY}`;
};

//
// movies
export const MOVIES_BASE = 'https://kinopoiskapiunofficial.tech/api';
export const MOVIES_API_KEY = '7dcd1d86-569b-4840-9c72-fa383b7b693a';

export const GET_BEST_MOVIES = (pageNumber) => {
  return `${MOVIES_BASE}/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${pageNumber}`;
};

export const GET_MOVIE_INFO_BY_ID = (filmId) => {
  return `${MOVIES_BASE}/v2.2/films/${filmId}`;
};

export const GET_MOVIE_STAFF_INFO_BY_ID = (filmId) => {
  return `${MOVIES_BASE}/v1/staff?filmId=${filmId}`;
};

export const GET_MOVIE_SIMILAR_BY_ID = (filmId) => {
  return `${MOVIES_BASE}/v2.2/films/${filmId}/similars`;
};

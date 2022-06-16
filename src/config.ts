const GAMES_BASE = 'https://api.rawg.io/api';
const GAMES_API_KEY = 'key=2d5893a4192a410486b36abbd099f4cb';

// shows
// const BASE_SHOWS = 'https://api.tvmaze.com';

// games
export const GET_BEST_GAMES = (pageNumber: number | string) => {
  return `${GAMES_BASE}/games?${GAMES_API_KEY}&page=${pageNumber}`;
};

export const GET_GAME_INFO_BY_ID = (gameId: number | string) => {
  return `${GAMES_BASE}/games/${gameId}?${GAMES_API_KEY}1`;
};

export const SEARCH_GAME_BY_NAME = (gameQuery: string) => {
  return `${GAMES_BASE}/games?${GAMES_API_KEY}&search=${gameQuery}`;
};

//
// movies
export const MOVIES_BASE = 'https://kinopoiskapiunofficial.tech/api';
export const MOVIES_API_KEY = '7dcd1d86-569b-4840-9c72-fa383b7b693a';

export const GET_BEST_MOVIES = (pageNumber: number | string) => {
  return `${MOVIES_BASE}/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${pageNumber}`;
};

export const GET_MOVIE_INFO_BY_ID = (filmId: number | string) => {
  return `${MOVIES_BASE}/v2.2/films/${filmId}`;
};

export const SEARCH_MOVIE_BY_NAME = (filmName: string) => {
  return `${MOVIES_BASE}/v2.1/films/search-by-keyword?keyword=${filmName}`;
};

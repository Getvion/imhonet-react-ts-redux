import axios from 'axios';
import { IGame } from '../@types/intefaces';

//
const GAMES_BASE = 'https://api.rawg.io/api';
const GAMES_API_KEY = 'key=2d5893a4192a410486b36abbd099f4cb';

const getGameInfoByID = async (gameId: string | number): Promise<IGame> => {
  const response = await axios.get(`${GAMES_BASE}/games/${gameId}?${GAMES_API_KEY}`);

  return response.data;
};

const getBestGames = async (pageNumber: number | string) => {
  const response = await axios.get(`${GAMES_BASE}/games?${GAMES_API_KEY}&page=${pageNumber}`);

  return response.data;
};

const searchGameByName = async (gameQuery: string) => {
  const response = await axios.get(`${GAMES_BASE}/games?${GAMES_API_KEY}&search=${gameQuery}`);

  return response.data;
};

export const gamesRequests = {
  getBestGames,
  getGameInfoByID,
  searchGameByName
};

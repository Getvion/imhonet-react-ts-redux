import axios from 'axios';
import { IGame, IItemInfo } from '../@types/intefaces';

//
const GAMES_BASE = 'https://api.rawg.io/api';
const GAMES_API_KEY = 'key=2d5893a4192a410486b36abbd099f4cb';

const gamesRequest = async <T>(requestString: string): Promise<T> => {
  const response = await axios.get(requestString);

  return response.data;
};

const getGameInfoByID = async (gameId: string | number): Promise<IItemInfo> => {
  const data = await gamesRequest<IGame>(`${GAMES_BASE}/games/${gameId}?${GAMES_API_KEY}`);

  // console.log('init', data);

  return {
    id: data.id,
    name: data.name,
    nameOriginal: data.name_original,
    posterUrl: data.background_image,
    year: data.released.split('-')[0],
    genres: data.genres.map((genre) => genre.name),
    rating1: data.metacritic / 10,
    rating2: data.rating * 2,
    description: data.description_raw,
    platforms: data.parent_platforms.map((elem) => elem.platform.name),
    achievementsCount: data.achievements_count,
    developers: data.developers.map((dev) => ({ name: dev.name, imgUrl: dev.image_background })),
    publishers: data.publishers.map((pub) => ({ name: pub.name, imgUrl: pub.image_background })),
    ageRating: data.esrb_rating.name
  };
};

const getBestGames = async (pageNumber: number | string) => {
  const data = await gamesRequest<any>(`${GAMES_BASE}/games?${GAMES_API_KEY}&page=${pageNumber}`);

  return data;
};

const searchGameByName = async (gameQuery: string) => {
  const data = await gamesRequest<any>(`${GAMES_BASE}/games?${GAMES_API_KEY}&search=${gameQuery}`);

  return data;
};

export const gamesRequests = {
  getBestGames,
  getGameInfoByID,
  searchGameByName
};

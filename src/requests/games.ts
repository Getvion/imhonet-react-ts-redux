import axios from 'axios';

import { IBestGames, IItemInfo } from '../@types/state';
import { IBestGamesRequest, IGameRequest, ISerchGamesRequest } from '../@types/requestInterfaces';

const GAMES_API_KEY = 'key=2d5893a4192a410486b36abbd099f4cb';

const gamesRequest = async <T>(requestString: string): Promise<T> => {
  const response = await axios.get(`https://api.rawg.io/api${requestString}`);

  return response.data;
};

const getGameInfoByID = async (gameId: string | number): Promise<IItemInfo> => {
  const data = await gamesRequest<IGameRequest>(`/games/${gameId}?${GAMES_API_KEY}`);

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

const getBestGames = async (pageNumber: number | string): Promise<IBestGames> => {
  const data = await gamesRequest<IBestGamesRequest>(`/games?${GAMES_API_KEY}&page=${pageNumber}`);

  return {
    next: data.next,
    previous: data.previous,
    results: data.results.map((obj) => ({
      id: obj.id,
      name: obj.name,
      posterUrl: obj.background_image,
      rating1: obj.metacritic / 10,
      rating2: obj.rating * 2,
      screenshots: obj.short_screenshots.map((shot) => ({ imageUrl: shot.image, id: shot.id })),
      genres: obj.genres.map((g) => g.name),
      year: obj.released.split('-')[0]
    }))
  };
};

const searchGameByName = async (gameQuery: string): Promise<any> => {
  const data = await gamesRequest<ISerchGamesRequest>(
    `/games?${GAMES_API_KEY}&search=${gameQuery}`
  );

  return data;
};

export const gamesRequests = {
  getBestGames,
  getGameInfoByID,
  searchGameByName
};

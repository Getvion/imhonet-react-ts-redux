/* eslint-disable no-underscore-dangle */

// shows
import axios from 'axios';
import { ISearchShowsRequest, IShowRequest } from '../@types/requestInterfaces';

import { IRequestResult, IItemInfo } from '../@types/state';

const showsRequest = async <T>(requestString: string): Promise<T> => {
  const response = await axios.get(`https://api.tvmaze.com${requestString}`);

  return response.data;
};

const getShowInfoByID = async (showId: string | number): Promise<IItemInfo> => {
  const data = await showsRequest<IShowRequest>(`/shows/${showId}?embed[]=seasons&
    embed[]=crew&embed[]=cast&embed[]=akas&embed[]=images`);

  return {
    name: data.name,
    id: data.id,
    posterUrl: data.image.original,
    description: data.summary,
    genres: data.genres?.map((genre) => genre),
    year: data.premiered?.split('-')[0],
    rating1: data.rating.average,
    nameOriginal: data._embedded.akas.find((elem) => elem.country.code === 'RU')?.name || '',
    countries: [data.network.country.name] || [],
    show: { seasons: data._embedded.seasons.length }
  };
};

// const getBestShows = async (pageNumber: number | string): Promise<IRequestResult[]> => {
//   const data = await showsRequest<IBestShowsRequest>(`/shows?page=${pageNumber || 1}`);
//   console.log(data);

//   return [];
// };

const searchShowsByName = async (showQuery: string): Promise<IRequestResult[]> => {
  const data = await showsRequest<ISearchShowsRequest[]>(`/search/shows?q=${showQuery}`);

  return [
    ...data.map(({ show }) => ({
      posterUrl: show.image?.original,
      genres: show.genres,
      id: show.id,
      name: show.name,
      rating1: show.rating.average || 0,
      year: show.premiered?.split('-')[0]
    }))
  ];
};

export const showsRequests = {
  // getBestShows,
  getShowInfoByID,
  searchShowsByName
};

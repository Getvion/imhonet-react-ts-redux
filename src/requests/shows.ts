/* eslint-disable no-underscore-dangle */

// shows
import axios from 'axios';
import { IBestShowsRequest, ISearchShowsRequest, IShowRequest } from '../@types/requestInterfaces';

import { IRequestResult, IItemInfo } from '../@types/state';

const showsRequest = async <T>(requestString: string): Promise<T> => {
  const response = await axios.get(`https://api.tvmaze.com${requestString}`);

  return response.data;
};

const getShowInfoByID = async (showId: string | number): Promise<IItemInfo> => {
  const data = await showsRequest<IShowRequest>(`/shows/${showId}?embed[]=seasons&
    embed[]=crew&embed[]=cast&embed[]=akas&embed[]=images`);

  return {
    name: data._embedded.akas.find((elem) => elem.country.code === 'RU')?.name || '',
    id: data.id,
    posterUrl: data.image.original,
    ageRating: '',
    description: data.summary,
    genres: data.genres.map((genre) => genre),
    year: data.premiered.split('-')[0],
    rating1: data.rating.average,
    nameOriginal: data.name,
    countries: [data.network.country.name] || []
  };
};

const getBestShows = async (pageNumber: number | string): Promise<IBestShowsRequest[]> => {
  const data = await showsRequest<IBestShowsRequest>(`/shows?page=${pageNumber || 1}`);
  console.log(data);

  return [{}];
};

const searchShowsByName = async (showQuery: string): Promise<IRequestResult[]> => {
  const data = await showsRequest<ISearchShowsRequest>(`search/shows?q=${showQuery}`);

  return [
    ...data.show.map((obj) => ({
      posterUrl: obj.image.original,
      genres: obj.genres,
      id: obj.id,
      name: obj.name,
      rating1: obj.rating.average || 0,
      year: obj.premiered.split('-')[0]
    }))
  ];
};

export const showsRequests = {
  getBestShows,
  getShowInfoByID,
  searchShowsByName
};

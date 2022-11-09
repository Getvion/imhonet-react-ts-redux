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
    name: data.name,
    id: data.id,
    posterUrl: data.image.original,
    description: data.summary,
    genres: data.genres?.map((genre) => genre),
    year: data.premiered?.split('-')[0],
    rating1: data.rating.average,
    nameOriginal: data._embedded.akas.find((elem) => elem.country?.code === 'RU')?.name || '',
    countries: [data.network.country.name] || [],
    show: { seasons: data._embedded.seasons.length }
  };
};

const getBestShows = async (page: string): Promise<IRequestResult[]> => {
  const pageNumber = Number(page);

  const startSlice = pageNumber * 20;
  const endSlice = startSlice + 20;

  const data = (await showsRequest<IBestShowsRequest[]>(`/shows?page=1`)).slice(
    startSlice,
    endSlice
  );

  return [
    ...data.map((show) => ({
      posterUrl: show.image?.original,
      genres: show.genres,
      id: show.id,
      name: show.name,
      rating1: show.rating.average || 0,
      year: show.premiered?.split('-')[0]
    }))
  ];
};

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
  getBestShows,
  getShowInfoByID,
  searchShowsByName
};

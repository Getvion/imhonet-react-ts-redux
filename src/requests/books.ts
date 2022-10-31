import axios from 'axios';

import { ISearchBooksRequest } from '../@types/requestInterfaces';
import { IRequestResult, IItemInfo } from '../@types/state';

const BOOKS_API_KEY = 'key=AIzaSyDhDJQqeUPsLMOpL9uHnITR7RmaO7EAZzw';

const booksRequest = async <T>(requestString: string): Promise<T> => {
  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${requestString}&${BOOKS_API_KEY}&maxResults=20`
  );

  return response.data;
};

const getBookInfoByID = async (bookID: string | number): Promise<IItemInfo> => {
  const data = await booksRequest<any>(`/volumes?q=${bookID}`);
  console.log(data);

  return {
    id: 1,
    name: '',
    nameOriginal: '',
    posterUrl: '',
    year: '10',
    genres: [],
    rating1: 10,
    rating2: 3,
    description: ''
  };
};

const getBestBooks = async (pageNumber: number | string): Promise<IRequestResult[]> => {
  const data = await booksRequest<any>(`/volumes?q=${pageNumber}`);
  console.log(data);

  return [
    // ...data.results.map((obj) => ({
    //   id: obj.id,
    //   name: obj.name,
    //   posterUrl: obj.background_image,
    //   rating1: obj.metacritic / 10,
    //   rating2: obj.rating * 2,
    //   screenshots: obj.short_screenshots.map((shot) => ({ imageUrl: shot.image, id: shot.id })),
    //   genres: obj.genres.map((g) => g.name),
    //   year: obj.released.split('-')[0]
    // }))
  ];
};

const searchBooksByName = async (bookQuery: string): Promise<IRequestResult[]> => {
  const data = await booksRequest<ISearchBooksRequest>(`/volumes?q=${bookQuery}`);
  console.log(data);

  return [
    {
      posterUrl: '',
      genres: [],
      id: 1,
      name: '',
      rating1: 1,
      rating2: 1,
      year: '1999'
    }
  ];
};

export const booksRequests = {
  getBookInfoByID,
  getBestBooks,
  searchBooksByName
};

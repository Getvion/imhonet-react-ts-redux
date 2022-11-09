import axios from 'axios';

import { IBookRequest, ISearchBooksRequest } from '../@types/requestInterfaces';
import { IRequestResult, IItemInfo } from '../@types/state';

const BOOKS_API_KEY = 'AIzaSyDhDJQqeUPsLMOpL9uHnITR7RmaO7EAZzw';

const booksRequest = async <T>(
  request: string,
  key: boolean,
  res: boolean,
  offset: number
): Promise<T> => {
  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes${request}${key ? `&key=${BOOKS_API_KEY}` : ''}${
      res ? '&maxResults=20' : ''
    }${offset ? `&startIndex=${offset}` : ''}&orderBy=newest`
  );

  return response.data;
};

const getBookInfoByID = async (bookID: string | number): Promise<IItemInfo> => {
  const { id, volumeInfo } = await booksRequest<IBookRequest>(`/${bookID}`, false, false, 0);

  return {
    id,
    name: volumeInfo.title,
    nameOriginal: '',
    posterUrl:
      volumeInfo.imageLinks?.thumbnail ||
      'https://nordicdesign.ca/wp-content/uploads/2020/02/book-thumbnail.jpg',
    year: volumeInfo.publishedDate,
    genres: volumeInfo.categories,
    rating1: volumeInfo.averageRating * 2,
    description: volumeInfo.description,
    book: { author: [...volumeInfo.authors], publisher: volumeInfo.publisher }
  };
};

const getBestBooks = async (page: string): Promise<IRequestResult[]> => {
  const pageNumber = Number(page);

  const offset = pageNumber * 20;
  const data = await booksRequest<ISearchBooksRequest>(`?q=игра`, true, true, offset);

  return [
    ...data.items.map(({ id, volumeInfo }) => ({
      id,
      posterUrl:
        volumeInfo.imageLinks?.thumbnail ||
        'https://nordicdesign.ca/wp-content/uploads/2020/02/book-thumbnail.jpg',
      genres: volumeInfo.categories,
      name: volumeInfo.title,
      rating1: 0,
      year: volumeInfo.publishedDate
    }))
  ];
};

const searchBooksByName = async (bookQuery: string): Promise<IRequestResult[]> => {
  const data = await booksRequest<ISearchBooksRequest>(`?q=${bookQuery}`, true, true, 0);

  return [
    ...data.items.map(({ id, volumeInfo }) => ({
      id,
      posterUrl:
        volumeInfo.imageLinks?.thumbnail ||
        'https://nordicdesign.ca/wp-content/uploads/2020/02/book-thumbnail.jpg',
      genres: volumeInfo.categories,
      name: volumeInfo.title,
      rating1: 0,
      year: volumeInfo.publishedDate
    }))
  ];
};

export const booksRequests = {
  getBookInfoByID,
  getBestBooks,
  searchBooksByName
};

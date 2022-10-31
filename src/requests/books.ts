import axios from 'axios';

import { IBookRequest, ISearchBooksRequest } from '../@types/requestInterfaces';
import { IRequestResult, IItemInfo } from '../@types/state';

const BOOKS_API_KEY = 'AIzaSyDhDJQqeUPsLMOpL9uHnITR7RmaO7EAZzw';

const booksRequest = async <T>(requestString: string, key: boolean, res: boolean): Promise<T> => {
  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes${requestString}${
      key ? `&key=${BOOKS_API_KEY}` : ''
    }${res ? '&maxResults=20' : ''}`
  );

  return response.data;
};

const getBookInfoByID = async (bookID: string | number): Promise<IItemInfo> => {
  const { id, volumeInfo } = await booksRequest<IBookRequest>(`/${bookID}`, false, false);

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

// const getBestBooks = async (pageNumber: number | string): Promise<IRequestResult[]> => {
//   const data = await booksRequest<any>(`/volumes?q=${pageNumber}`, true, true);
//   console.log(data);

//   return [
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
//   ];
// };

const searchBooksByName = async (bookQuery: string): Promise<IRequestResult[]> => {
  const data = await booksRequest<ISearchBooksRequest>(`?q=${bookQuery}`, true, true);

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
  // getBestBooks,
  searchBooksByName
};

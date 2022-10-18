export interface IAdd {
  title: string;
  sectionName: string;
  items: IItem[];
}

export interface IItem {
  id: number;
  name: string;
  nameOrig: string;
  bgImg: string;
  section: string;
}

// userData
export interface IUserData {
  user: {
    userData: { email: string; name: string; imageUrl: string; country: string; description: string };
    lists: { items: IItem[]; title: string; description: string }[];
    favoriteContent: { title: string; items: IItem[] }[];
    waitingContent: { title: string; items: IItem[] }[];
  };
}

// movies
export interface IMovie {
  filmId: number;
  kinopoiskId: number;
  nameRu: string;
  nameOriginal: string;
  posterUrl: string;
  posterUrlPreview: string;
  ratingKinopoisk: number;
  ratingImdb: number;
  year: number;
  filmLength: number;
  description: string;
  ratingMpaa: string;
  ratingAgeLimits: string;
  countries: { country: string }[];
  genres: { genre: string }[];
}

export interface IMovieData {
  movieInfo: IMovie;
}

// games
export interface IGame {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  metacritic: number;
  released: string;
  background_image: string;
  rating: number;
  esrb_rating: { name: string };
  platforms: { platform: { name: string } }[];
  description_raw: string;
  developers: { name: string }[];
  genres: { name: string }[];
  publishers: { name: string }[];
}

export interface IGameInfo {
  gameInfo: IGame;
}

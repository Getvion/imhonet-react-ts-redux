// ! movies

// service interfaces
interface IMovieFilm {
  countries: { country: string }[];
  filmId: number;
  filmLength: string;
  genres: { genre: string }[];
  nameEn: string;
  nameRu: string;
  posterUrl: string;
  posterUrlPreview: string;
  rating: string;
  ratingVoteCount: number;
  year: string;
}

//

export interface IMovieRequest {
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
  completed: boolean;
  coverUrl: string;
  editorAnnotation: string;
  endYear: number;
  has3D: boolean;
  hasImax: boolean;
  imdbId: string;
  isTicketsAvailable: boolean;
  lastSync: string;
  logoUrl: string;
  nameEn: string;
  productionStatus: string;
  ratingAwait: number;
  ratingAwaitCount: number;
  ratingFilmCritics: number;
  ratingFilmCriticsVoteCount: number;
  ratingGoodReview: number;
  ratingGoodReviewVoteCount: number;
  ratingImdbVoteCount: number;
  ratingKinopoiskVoteCount: number;
  ratingRfCritics: number;
  ratingRfCriticsVoteCount: number;
  reviewsCount: number;
  serial: boolean;
  shortDescription: string;
  shortFilm: boolean;
  slogan: string;
  startYear: null;
  type: string;
  webUrl: string;
}

export interface IBestMoviesRequest {
  pagesCount: number;
  films: IMovieFilm[];
}

export interface ISearchMoviesRequest {
  films: {}[];
  keyword: string;
  pagesCount: number;
  searchFilmsCountResult: number;
}

// ! games

// service interfaces
interface IGamePlatform {
  released_at: string;
  requirements: { minimum: string; recommended: string };
  platform: {
    games_count: number;
    id: number;
    image: string;
    image_background: string;
    name: string;
    slug: string;
    year_end: number;
    year_start: number;
  };
}

interface IGameGenre {
  name: string;
  games_count: number;
  id: number;
  image_background: number;
  slug: string;
}

interface IGameStore {
  url: string;
  store: {
    id: number;
    domain: string;
    games_count: number;
    image_background: string;
    name: string;
    slug: string;
  };
}

interface IGameParentPlatform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

//

export interface IGameRequest {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  metacritic: number;
  released: string;
  background_image: string;
  rating: number;
  esrb_rating: { name: string; id: number };
  platforms: IGamePlatform[];
  description_raw: string;
  developers: { name: string; image_background: string }[];
  genres: IGameGenre[];
  publishers: { name: string; image_background: string }[];
  parent_platforms: IGameParentPlatform[];
  achievements_count: number;
  stroes: IGameStore[];
  background_image_additional: string;
  creators_count: number;
  description: string;
  added: number;
  additions_count: number;
  dominant_color: string;
  metacritic_url: string;
  movies_count: number;
  parent_achievements_count: number;
  rating_top: number;
  ratings_count: number;
  reddit_count: number;
  reddit_description: string;
  reddit_logo: string;
  reddit_name: string;
  reddit_url: string;
  reviews_count: number;
  reviews_text_count: number;
  saturated_color: string;
  screenshots_count: number;
  suggestions_count: number;
  tba: boolean;
  twitch_count: number;
  updated: string;
  user_game: boolean;
  website: string;
  youtube_count: number;
}

export interface IBestGamesRequest {
  count: 814163;
  description: string;
  next: string;
  nofollow: boolean;
  nofollow_collections: string[];
  noindex: boolean;
  previous: string;
  results: {
    added: number;
    background_image: string;
    dominant_color: string;
    esrb_rating: { name: string; id: number };
    genres: IGameGenre[];
    id: number;
    metacritic: number;
    name: string;
    parent_platforms: IGameParentPlatform[];
    platforms: IGamePlatform[];
    playtime: number;
    rating: number;
    rating_top: number;
    ratings_count: number;
    released: '2013-09-17';
    reviews_count: number;
    reviews_text_count: number;
    saturated_color: string;
    short_screenshots: { id: number; image: string }[];
    slug: string;
    suggestions_count: number;
    tba: boolean;
    updated: string;
    stores: IGameStore[];
  }[];
}

export interface ISerchGamesRequest {
  count: number;
  next: string;
  previous: string;
  results: {
    added: number;
    background_image: string;
    dominant_color: string;
    esrb_rating: { name: string; id: number };
    genres: IGameGenre[];
    id: number;
    metacritic: number;
    name: string;
    parent_platforms: IGameParentPlatform[];
    platforms: IGamePlatform[];
    playtime: number;
    rating: number;
    rating_top: number;
    ratings_count: number;
    released: '2013-09-17';
    reviews_count: number;
    reviews_text_count: number;
    saturated_color: string;
    short_screenshots: { id: number; image: string }[];
    slug: string;
    suggestions_count: number;
    tba: boolean;
    updated: string;
    stores: IGameStore[];
  }[];
  user_platforms: boolean;
}

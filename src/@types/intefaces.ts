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
    userData: {
      email: string;
      name: string;
      imageUrl: string;
      country: string;
      description: string;
    };
    lists: { items: IItem[]; title: string; description: string }[];
    favoriteContent: { title: string; items: IItem[] }[];
    waitingContent: { title: string; items: IItem[] }[];
  };
}

// movies
export interface IMovieData {
  movieInfo: IItemInfo;
}

// games
export interface IGameInfo {
  gameInfo: IItemInfo;
}

export interface IItemInfo {
  id: number;
  name: string;
  nameOriginal: string;
  posterUrl: string;
  year: string;
  genres: string[];
  rating1: number;
  rating2: number;
  description: string;
  platforms?: string[];
  achievementsCount?: number;
  developers?: { name: string; imgUrl: string }[];
  publishers?: { name: string; imgUrl: string }[];
  countries?: string[];
  filmLength?: number;
  ageRating: string;
}

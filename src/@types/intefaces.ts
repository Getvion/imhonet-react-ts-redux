export interface IAdd {
  title: string;
  sectionName: SectionType;
  items: IItem[];
}

export interface IAddReview {
  sectionName: SectionType;
  items: IReview[];
}

export interface IItem {
  id: number;
  name: string;
  nameOrig: string;
  bgImg: string;
  section: SectionType;
  year: string;
  genres: string[];
}

export interface IReview {
  id: number;
  name: string;
  section: SectionType;
  reviewText: string;
  reviewRating: number;
  year: string;
  genres: string[];
}

export type SubmitFormType = React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>;
export type SectionType = 'movies' | 'shows' | 'books' | 'games';

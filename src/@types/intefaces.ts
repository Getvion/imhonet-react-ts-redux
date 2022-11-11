export interface IAdd {
  title: string;
  sectionName: string;
  items: IItem[];
}

export interface IAddReview {
  sectionName: string;
  items: IReview[];
}

export interface IItem {
  id: number;
  name: string;
  nameOrig: string;
  bgImg: string;
  section: string;
}

export interface IReview {
  id: number;
  name: string;
  section: string;
  reviewText: string;
  reviewRating: number;
}

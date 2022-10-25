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

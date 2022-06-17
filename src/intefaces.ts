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
    userData: { email: string; name: string };
    lists: { items: IItem[]; title: string; description: string }[];
    favoriteContent: { title: string; items: IItem[] }[];
    waitingContent: { title: string; items: IItem[] }[];
  };
}

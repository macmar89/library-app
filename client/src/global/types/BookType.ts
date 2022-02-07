export type BookType = {
  _id: string;
  title: string;
  author?: string;
  desc: string;
  slug: string;
  yearOfRelease: string | number;
  isBorrowed: boolean;
  whoBorrowed: string | any;
  borrowedDate?: string;
};

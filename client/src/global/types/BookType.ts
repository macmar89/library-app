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
  libraryId: string;
  borrowed: {
    isBorrowed: boolean;
    whoBorrowed: string | User | any;
    borrowedDate?: string;
  }[];
};

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

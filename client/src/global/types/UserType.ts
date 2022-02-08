import { BookType } from "./BookType";

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  borrowedBooks: { book?: string; date?: string }[];
  history: BookType[];
  libraryId: string
  currentBooks: number
};


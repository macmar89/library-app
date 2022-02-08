import { BookType } from "./BookType";

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  borrowedBooks: { bookId?: string; date?: string }[];
  history: BookType[];
  libraryId: string
};


import {BookType} from "./BookType";

export type UserType = {
  _id: string
  firstName: string
  lastName: string
  email: string
  borrowedBooks: BorrowedBooks[]
  history: BookType[]
}

interface BorrowedBooks {
  bookId?: string
  date?: string
}

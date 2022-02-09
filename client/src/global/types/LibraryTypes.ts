export type LibraryType = {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  books: any;
  students: any;
  address: {
    street: string;
    city: string;
    postalCode: string;
    state: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  totalBooks: number
  currentBorrowedBooks: number
};

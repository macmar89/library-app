export type BookType = {
  _id: string;
  title: string;
  desc: string;
  slug: string;
  yearOfRelease: string | number;
  borrowed: { isBorrowed: boolean; whoBorrowed: string | any };
};

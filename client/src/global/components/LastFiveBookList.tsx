import React from "react";
import { Link } from "react-router-dom";

interface LastFiveBookListProps {
  books: any;
  slug: string | undefined;
  className?: string;
}

export const LastFiveBookList = ({
  books,
  slug,
  className,
}: LastFiveBookListProps) => {
  return (
    <ul className={className}>
      {books?.slice(0, 5).map((book: any, index: number) => (
        <li key={index}>
          <Link to={`/kniznica/${slug}/kniha/${book.book?._id}`}>
            {book.book?.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

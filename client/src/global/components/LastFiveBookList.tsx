import React from "react";
import { Link } from "react-router-dom";

interface LastFiveBookListProps {
  books: any;
  slug?: string
  className?: string;
  url?: string
}

export const LastFiveBookList = ({
  books,
  slug,
  className,
  url
}: LastFiveBookListProps) => {
  return (
    <div className={`border rounded-xl p-5 mt-5 shadow-xl ${className}`}>

    <ul >
      {books?.slice(0, 5).map((book: any, index: number) => (
        <li key={index} className='border-b py-2 pl-1.5 last:border-0 '>
          <h4>
            <Link to={`/kniznica/${slug}/kniha/${book.book?._id}`}>
              {book.book?.title}
            </Link>
          </h4>
        </li>
      ))}
    </ul>
      <div className={'py-2 text-right text-xl text-gray-700 uppercase'}>
      <Link to={`/`} >
        Zobraziť celý zoznam
      </Link>
      </div>
    </div>
  );
};

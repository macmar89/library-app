import React from "react";
import { Link } from "react-router-dom";

interface LastFiveBookListProps {
  title: string;
  books: any;
  slug?: string;
  className?: string;
  url?: string;
  emptyLabel: string;
  count?: number;
}

export const LastFiveBookList = ({
  title,
  books,
  slug,
  className,
  url,
  emptyLabel,
  count,
}: LastFiveBookListProps) => {
  return (
    <div className={`border rounded-xl p-5 shadow-xl ${className}`}>
      <h2 className="text-center mb-5">{title}</h2>
      {books && books?.length > 0 ? (
        <>
          <ul>
            {books?.slice(0, count || 5).map((book: any, index: number) => (
              <li key={index} className="border-b py-2 pl-1.5 last:border-0 ">
                <h4>
                  <Link to={`/kniznica/${slug}/kniha/${book.book?._id}`}>
                    {book.book?.title}
                  </Link>
                </h4>
              </li>
            ))}
          </ul>
          {url && (
            <div className={"py-2 text-right text-xl text-gray-700 uppercase"}>
              <Link to={{pathname: url, state: {book: books}}}>Zobraziť celý zoznam</Link>
            </div>
          )}
        </>
      ) : (
        <div className="pt-2 text-gray-700 uppercase text-center ">
          <h4>{emptyLabel}</h4>
        </div>
      )}
    </div>
  );
};

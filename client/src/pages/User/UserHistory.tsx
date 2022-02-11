import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { UserAtom } from "../../global/recoil/UserAtom";
import { formatDate } from "../../global/helpers/Moment";
import { Pagination } from "../../global/components/Pagination";
import { BookType } from "../../global/types/BookType";
import { LibraryAtom } from "../../global/recoil/LibraryAtom";

const UserHistory = () => {
  const user = useRecoilValue(UserAtom);
  const library = useRecoilValue(LibraryAtom);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [booksPerPage] = useState<number>(10);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;

  const currentBooks: BookType[] = user?.history?.slice(
    indexOfFirstBook,
    indexOfLastBook
  );

  return (
    <div>
      <h1>
        História - {user?.firstName} {user?.lastName}{" "}
      </h1>
      <div className="grid grid-cols-6 px-5">
        <h4 className="col-span-3">Názov knihy</h4>
        <h4 className="col-span-1">Autor</h4>
        <h4 className="col-span-1">Dátum požičania</h4>
        <h4 className="col-span-1">Dátum vrátenia</h4>
      </div>
      <ul className="p-5 rounded ">
        {currentBooks?.map((book: any) => (
          <li
            key={book._id}
            className="grid grid-cols-6 border-b p-2 mb-2 last:mb-0"
          >
            <Link
              to={`/kniznica/${library?.library?.slug}/kniha/${book.book?._id}`}
              className="col-span-3"
            >
              {book.book?.title}
            </Link>
            <div className="col-span-1">{book.book?.author}</div>
            <div className="col-span-1">{formatDate(book.borrowedDate)}</div>
            <div className="col-span-1">{formatDate(book.returnedDate)}</div>
          </li>
        ))}
      </ul>
      {user?.history?.length > 10 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          countOfPages={Math.ceil(user?.history?.length / booksPerPage)}
        />
      )}
    </div>
  );
};

export default UserHistory;

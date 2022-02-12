import React, { Dispatch, SetStateAction } from "react";
import { BookType } from "../../global/types/BookType";
import { Link } from "react-router-dom";
import { RiDeleteBin5Line, RiEdit2Line, RiMoreFill } from "react-icons/ri";
import { useSetRecoilState } from "recoil";
import { BookAtom } from "../../global/recoil/BookAtom";

interface BookListProps {
  books: any;
  url: string;
  handleDelete: Dispatch<SetStateAction<any>>;
}

const BookList = ({ books, url, handleDelete }: BookListProps) => {
  const setBook = useSetRecoilState(BookAtom);

  return (
    <div>
      {books?.map((book: BookType) => (
        <div
          key={book._id}
          className="flex items-center px-2 py-3 text-xl border hover:bg-gray-500 transition cursor-pointer"
        >
          <Link
            to={`${url.slice(0, url.lastIndexOf("/"))}/kniha/${book._id}`}
            className={`w-5/6 hover:underline`}
            onClick={() => setBook(book)}
          >
            {book.title}
          </Link>
          <div className="w-1/6 list-icons">
            <Link
              to={`${url.slice(0, url.lastIndexOf("/"))}/kniha/${
                book._id
              }/uprav`}
              className="list-icon"
              onClick={() => setBook(book)}
            >
              <RiEdit2Line className="text-green-700" />
            </Link>
            <Link
              to={`${url.slice(0, url.lastIndexOf("/"))}/kniha/${book._id}`}
              className="list-icon"
              onClick={() => setBook(book)}
            >
              <RiMoreFill />
            </Link>
            <div className="list-icon" onClick={() => handleDelete(book._id)}>
              <RiDeleteBin5Line className={"text-red-600 "} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;

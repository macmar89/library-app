import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {useRouteMatch, Link, useHistory} from "react-router-dom";
import { LibraryAtom } from "../../global/recoil/LibraryAtom";
import { BookType } from "../../global/types/BookType";
import Pagination from "../../global/components/Pagination";
import { RiDeleteBin5Line, RiMoreFill, RiEdit2Line } from "react-icons/ri";

interface IBooks {
  success: true;
  books: BookType[];
  bookCount: number;
  resultPerPage: number;
}

const AllBooks = () => {
  const [books, setBooks] = useState<IBooks | any>([]);
  const library = useRecoilValue(LibraryAtom);
  const [keyword, setKeyword] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredBooks, setFilteredBooks] = useState<BookType[] | null>(null);
  const { url } = useRouteMatch();
  const history = useHistory()

  const id = library?.library?._id;

  useEffect(() => {
    const fetchBooks = async () => {
      const id = library?.library?._id;
      const res = await axios.get(`/api/${id}/books`);
      if (res?.data?.success) {
        setBooks(res?.data?.books);
      }
      if (!res?.data?.success) {
        return <div>smolka</div>;
      }
    };
    fetchBooks();
  }, [library]);

  const countOfPages = Math.ceil(books?.bookCount / books?.resultPerPage);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.get(`/api/${id}/books?keyword=${keyword}`);
    setKeyword("");
    setFilteredBooks(res?.data?.books);
  };

  const handleDelete = async (id: string) => {

    await axios
      .delete("/api/book/" + id)
      .then(() => history.push(`${url}`))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={"Hľadaj ..."}
            name="keyword"
            value={keyword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setKeyword(e.target.value)
            }
          />

          <button>Hľadať</button>
        </form>
      </div>
      <div>
        {filteredBooks ? (
          <>
            {filteredBooks?.map((book: BookType) => (
              <Link
                to={`${url.slice(0, url.lastIndexOf("/"))}/kniha/${book._id}`}
                key={book._id}
                className="flex px-2 py-3 text-xl border hover:bg-gray-500 transition cursor-pointer"
              >
                {book.title}
              </Link>
            ))}
            <span
              className="cursor-pointer underline text-right"
              onClick={() => setFilteredBooks(null)}
            >
              Späť na všetkých používateľov
            </span>
          </>
        ) : (
          books?.map((book: BookType) => (
            <div
              key={book._id}
              className="flex items-center px-2 py-3 text-xl border hover:bg-gray-500 transition cursor-pointer"
            >
              <Link
                to={`${url.slice(0, url.lastIndexOf("/"))}/kniha/${book._id}`}
                className={`w-5/6 hover:underline`}
              >
                {book.title}
              </Link>
              <div className="w-1/6 list-icons">
                <Link
                  to={`${url.slice(0, url.lastIndexOf("/"))}/kniha/${book._id}`}
                  className="list-icon"
                >
                  <RiEdit2Line />
                </Link>
                <Link
                  to={`${url.slice(0, url.lastIndexOf("/"))}/kniha/${book._id}`}
                  className="list-icon"
                >
                  <RiMoreFill />
                </Link>
                <div
                  className="list-icon"
                  onClick={() => handleDelete(book._id)}
                >
                  <RiDeleteBin5Line className={"text-red-600 "} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        countOfPages={countOfPages}
      />
    </div>
  );
};

export default AllBooks;

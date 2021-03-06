import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import {toast} from "react-toastify";
import { useRecoilValue } from "recoil";

import { LibraryAtom } from "../../global/recoil/LibraryAtom";
import { BookType } from "../../global/types/BookType";
import { Pagination } from "../../global/components/Pagination";
import BookList from "../../layout/Book/BookList";
import { Button } from "../../global/components/Button";
import NoMatch from "../NoMatch";

interface IBooks {
  success: true;
  books: any;
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

  const id = library?._id;

  const fetchBooks = async () => {
    const id = library?.library?._id;
    const res = await axios.get(
      currentPage === 1
        ? `/api/${id}/books`
        : `/api/${id}/books/?page=${currentPage}`
    );
    if (res?.data?.success) {
      setBooks(res?.data);
    }
    if (!res?.data?.success) {
      return <NoMatch />;
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [library, currentPage, id]);

  const countOfPages = Math.ceil(books?.bookCount / books?.resultPerPage);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.get(`/api/${id}/books?keyword=${keyword}`);
    setKeyword("");
    setFilteredBooks(res?.data?.books);
  };

  const handleDelete = async (id: string) => {
    const agreement = window.confirm(`Chcete vymazať túto knihu?`);

    if (agreement) {
      await axios
        .delete("/api/book/" + id).then(() => toast('Kniha bola vymazaná z knižnice'))
        .then(() => fetchBooks())
        .catch((err) => console.log(err));
    }
    if (!agreement) return;
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-x-5">
        <input
          type="text"
          placeholder={"Hľadaj podľa názvu knihy ..."}
          name="keyword"
          value={keyword}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setKeyword(e.target.value)
          }
          className="w-full"
        />
        <Button label={"Hľadať"} />
      </form>

      <div className="mt-10">
        <BookList
          books={filteredBooks ? filteredBooks : books?.books}
          url={url}
          handleDelete={handleDelete}
        />
        {filteredBooks && (
          <div
            className="cursor-pointer underline text-right mt-5"
            onClick={() => setFilteredBooks(null)}
          >
            Späť na všetky knihy
          </div>
        )}
      </div>
      {countOfPages > 1 && (
        <Pagination
          setCurrentPage={setCurrentPage}
          countOfPages={countOfPages}
        />
      )}
    </div>
  );
};

export default AllBooks;

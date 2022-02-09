import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useRouteMatch, useHistory } from "react-router-dom";
import { LibraryAtom } from "../../global/recoil/LibraryAtom";
import { BookType } from "../../global/types/BookType";
import Pagination from "../../global/components/Pagination";
import BookList from "../BookDetailLayout/BookList";

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
  const history = useHistory();

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
          <button className='btn-primary'>Hľadať</button>
        </form>
      </div>

      <BookList
        books={filteredBooks ? filteredBooks : books}
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

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        countOfPages={countOfPages}
      />
    </div>
  );
};

export default AllBooks;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { LibraryAtom } from "../../global/recoil/LibraryAtom";
import { BookType } from "../../global/types/BookType";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const library = useRecoilValue(LibraryAtom);

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

  return (
    <div>
      <div>
        {books?.map((book: BookType) => (
          <div key={book._id}>{book.title}</div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;

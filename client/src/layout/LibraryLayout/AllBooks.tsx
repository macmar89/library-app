import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {useRouteMatch, Link} from "react-router-dom";
import { LibraryAtom } from "../../global/recoil/LibraryAtom";
import { BookType } from "../../global/types/BookType";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const library = useRecoilValue(LibraryAtom);
  const {url} = useRouteMatch()

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
          <Link to={`${url.slice(0, url.lastIndexOf("/"))}/kniha/${book._id}`} key={book._id} className='flex px-2 py-3 text-xl border hover:bg-gray-500 transition cursor-pointer'>{book.title}</Link>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;

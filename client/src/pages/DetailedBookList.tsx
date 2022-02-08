import React from 'react';
import {useLocation} from "react-router-dom";
import {BookType} from "../global/types/BookType";

const DetailedBookList = () => {
  const {
    state,
  }: {
    state: {
      books: BookType[];
    };
  } = useLocation();

  const books = state.books

  console.log()

  return (
    <div>

    </div>
  );
};

export default DetailedBookList;

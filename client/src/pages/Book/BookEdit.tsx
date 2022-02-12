import React from "react";
import { BookCreateUpdateForm } from "./BookCreateUpdateForm";
import {useRecoilValue} from "recoil";
import {BookAtom} from "../../global/recoil/BookAtom";

const BookEdit = () => {
  const book = useRecoilValue(BookAtom)

  return (
    <div className='mt-10'>
      <BookCreateUpdateForm title='Uprav knižnicu' toastMessage='Knižnica bola upravená' book={book}/>
    </div>
  );
};

export default BookEdit;

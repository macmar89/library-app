import React from "react";
import { BookCreateUpdateForm } from "./BookCreateUpdateForm";

const BookEdit = () => {
  return (
    <div className='mt-10'>
      <BookCreateUpdateForm title='Uprav knižnicu' toastMessage='Knižnica bola upravená'/>
    </div>
  );
};

export default BookEdit;

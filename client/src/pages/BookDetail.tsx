import React, { useEffect, useState } from "react";
import { BookType } from "../global/types/BookType";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookDetail = () => {
  const [bookDetail, setBookDetail] = useState<BookType | null>(null);
  const { id }: { id: string } = useParams();

  useEffect(() => {
    const fetchBookDetail = async () => {
      const res = await axios.get(`/api/book/${id}`);
      if (res?.data?.success) {
        setBookDetail(res?.data?.book);
      }
      if (!res?.data?.success) return <div>Error Page</div>;
    };
    fetchBookDetail();
  }, [setBookDetail, id]);

  console.log(`/api/book/${id}`);

  return (
    <div className="container ">
      <div className="flex gap-x-5 ">
        <div className="w-2/6 h-96 border-2">image</div>
        <article className="w-3/6">
          <h3 className="my-3">{bookDetail?.title}</h3>
          <h5 className="my-2">
            Rok vydania: <strong>{bookDetail?.yearOfRelease}</strong>
          </h5>
          <div>{bookDetail?.desc}</div>
        </article>
        <aside className="w-1/6">
          {bookDetail?.borrowed?.isBorrowed ? (
            <div>je pozicana</div>
          ) : (
            <div>je v kniznici</div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default BookDetail;

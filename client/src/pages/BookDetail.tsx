import React, { useEffect, useState } from "react";
import { BookType } from "../global/types/BookType";
import { useParams, Link, useRouteMatch } from "react-router-dom";
import axios from "axios";

const BookDetail = () => {
  const [bookDetail, setBookDetail] = useState<BookType | null>(null);
  const { id }: { id: string } = useParams();
  const { url } = useRouteMatch();

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

  const handleReturn = async () => {
    let returnedBook = {
      ...bookDetail,
      borrowed: { isBorrowed: false, whoBorrowed: "-" },
    };
    await axios
      .put(`/api/book/${bookDetail?._id}`, returnedBook)
      .then((res) => setBookDetail(res?.data?.book));
  };

  const rentUrl = () => {
    const lastIndexCut = url.slice(0, url.lastIndexOf("/"))
    return lastIndexCut.slice(0, lastIndexCut.lastIndexOf('/'))
  };

  return (
    <div className="container ">
      <h2 className="text-center">{bookDetail?.title}</h2>
      <div className="py-5">
        {bookDetail?.borrowed?.isBorrowed ? (
          <div className="flex justify-between items-center">
            <div>Požičaná: {bookDetail?.borrowed?.whoBorrowed}</div>
            <button onClick={handleReturn}>Vratit</button>
          </div>
        ) : (
          <div className="flex justify-end items-center">
            <Link className="btn" to={{pathname: `${rentUrl()}/pozicaj/${bookDetail?._id}`, state:  {bookDetail}}}>
              Pozicaj
            </Link>
          </div>
        )}
      </div>
      <div className="flex gap-x-5 ">
        <aside className="w-2/6 h-96 border-2">image</aside>
        <article className="w-4/6">
          <h5 className="mb-4">
            Autor: <strong>{bookDetail?.author}</strong>
          </h5>
          <h5 className="mb-4">
            Rok vydania: <strong>{bookDetail?.yearOfRelease}</strong>
          </h5>
          <div>{bookDetail?.desc}</div>
        </article>
      </div>
    </div>
  );
};

export default BookDetail;

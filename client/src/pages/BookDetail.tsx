import React, { useEffect, useState } from "react";
import { BookType } from "../global/types/BookType";
import { useParams, Link, useRouteMatch } from "react-router-dom";
import axios from "axios";
import { formatDate, returnTo } from "../global/helpers/Moment";
import { UserType } from "../global/types/UserType";

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

  const handleReturnToLibrary = async () => {
    const today = new Date();
    let updatedBook = {
      ...bookDetail,
      isBorrowed: false,
      whoBorrowed: "",
      borrowedDate: "",
    };
    // console.log(returnedBook);
    let user: UserType = { ...bookDetail?.whoBorrowed };
    const book = {
      book: bookDetail?._id,
      borrowedDate: bookDetail?.borrowedDate,
      returnedDate: today.toISOString(),
    };

    console.log(JSON.stringify(updatedBook))

    const updatedUser = { ...user, history: [...user?.history, book] };

    // await axios
    //   .put(`/api/book/${bookDetail?._id}`, updatedBook)
    //   .then((res) => setBookDetail(res?.data?.book));

    await axios
      .put(`/api/user/${user?._id}`, updatedUser)
      .then((res) => console.log(res));
  };

  const rentUrl = () => {
    const lastIndexCut = url.slice(0, url.lastIndexOf("/"));
    return lastIndexCut.slice(0, lastIndexCut.lastIndexOf("/"));
  };

  return (
    <div className="container">
      <h2 className="text-center">{bookDetail?.title}</h2>
      <div className="py-5">
        {bookDetail?.isBorrowed ? (
          <div className="flex justify-between items-center">
            <div>
              Požičaná:{" "}
              <Link
                to={`/library/${bookDetail?.libraryId}/uzivatel/${bookDetail?.whoBorrowed?._id}`}
              >
                {bookDetail?.whoBorrowed?.firstName}{" "}
                {bookDetail?.whoBorrowed?.lastName}
              </Link>
            </div>
            <div>Dátum požičania: {formatDate(bookDetail?.borrowedDate)}</div>
            <div>Vrátiť do: {returnTo(bookDetail?.borrowedDate)}</div>
            <button onClick={handleReturnToLibrary}>Vratit</button>
          </div>
        ) : (
          <div className="flex justify-end items-center">
            <Link
              className="btn"
              to={{
                pathname: `${rentUrl()}/pozicaj/${bookDetail?._id}`,
                state: { bookDetail },
              }}
            >
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

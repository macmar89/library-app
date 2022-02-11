import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useRouteMatch } from "react-router-dom";
import { BookType } from "../global/types/BookType";
import { formatDate, returnTo } from "../global/helpers/Moment";
import { textWithBr } from "../global/helpers/formatText";
import {useRecoilValue} from "recoil";
import {LibraryAtom} from "../global/recoil/LibraryAtom";
import {Button} from "../global/components/Button";

const BookDetail = () => {
  const [bookDetail, setBookDetail] = useState<BookType | null>(null);
  const library = useRecoilValue(LibraryAtom)
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
    let user = { ...bookDetail?.borrowed[0].whoBorrowed };
    let returnedBook = {
      book: bookDetail?._id,
      borrowedDate: bookDetail?.borrowed[0]?.borrowedDate,
      returnedDate: today.toISOString(),
    };

    let updatedBook = {
      ...bookDetail,
      borrowed: [],
    };
    await axios
      .put(`/api/book/${bookDetail?._id}`, updatedBook)
      .then((res) => setBookDetail(res?.data?.book));

    user = {
      ...user,
      history: [...user?.history, returnedBook],
      borrowedBooks: user?.borrowedBooks.filter(
        (book: any) => book.book !== returnedBook?.book
      ),
    };

    await axios
      .put(`/api/user/${user?._id}`, user)
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
        {bookDetail?.borrowed[0]?.isBorrowed ? (
          <div className="flex justify-between items-center">
            <div>
              Požičaná:{" "}
              <Link
                to={`/kniznica/${library?.library?.slug}/uzivatel/${bookDetail?.borrowed[0]?.whoBorrowed?._id}`}
              >
                {bookDetail?.borrowed[0]?.whoBorrowed?.firstName}{" "}
                {bookDetail?.borrowed[0]?.whoBorrowed?.lastName}
              </Link>
            </div>
            <div>
              Dátum požičania:{" "}
              {formatDate(bookDetail?.borrowed[0].borrowedDate)}
            </div>
            <div>
              Vrátiť do: {returnTo(bookDetail?.borrowed[0].borrowedDate)}
            </div>
            <Button label={'Vratit'} onClick={handleReturnToLibrary} />
          </div>
        ) : (
          <div className="flex justify-end items-center">
            <Link
              className="btn btn-primary"
              to={{
                pathname: `${rentUrl()}/pozicaj/${bookDetail?._id}`,
                state: { bookDetail },
              }}
            >
              Pozičať
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
          {bookDetail?.desc && (
            <div
              dangerouslySetInnerHTML={{ __html: textWithBr(bookDetail.desc) }}
            />
          )}
        </article>
      </div>
    </div>
  );
};

export default BookDetail;

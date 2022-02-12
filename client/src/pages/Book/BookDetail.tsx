import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import { useParams, Link, useRouteMatch, useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { BookType } from "../../global/types/BookType";
import { formatDate, returnTo } from "../../global/helpers/Moment";
import { textWithBr } from "../../global/helpers/formatText";
import { LibraryAtom } from "../../global/recoil/LibraryAtom";
import { Button } from "../../global/components/Button";
import { toast } from "react-toastify";

const BookDetail = () => {
  const [bookDetail, setBookDetail] = useState<BookType | null>(null);
  const library = useRecoilValue(LibraryAtom);
  const { id }: { id: string } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();

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
    const agreement = window.confirm("Chcete vrátiť knihu do knižnice?");

    if (agreement) {
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
    }

    if (!agreement) return;
  };

  const rentUrl = () => {
    const lastIndexCut = url.slice(0, url.lastIndexOf("/"));
    return lastIndexCut.slice(0, lastIndexCut.lastIndexOf("/"));
  };

  const handleRemove = async () => {
    const agreement = window.confirm("Chcete vymazať túto knihu?");

    if (agreement) {
      if (bookDetail?.borrowed[0]?.isBorrowed) {
        toast("Nedá sa vymazať: kniha musí byť vrátená do knižnice.");
      }
      if (!bookDetail?.borrowed[0]?.isBorrowed) {
        await axios
          .delete("/api/book/" + bookDetail?._id)
          .then(() => toast("Kniha bola vymazaná z knižnice"))
          .then(() => history.push(`/kniznica/${library?.library?._id}/knihy`))
          .catch(() =>
            toast("Niečo sa pokazilo. Kniha nebola vymazaná z knižnice")
          );
      }
    }

    if (!agreement) return;
  };

  return (
    <div className="container">
      <header className="pb-10 px-5 relative ">
        <h2 className="">{bookDetail?.title}</h2>
        <div className="flex absolute right-5 top-0 gap-x-5">
          <RiEdit2Line className="text-3xl cursor-pointer text-green-700" />
          <RiDeleteBin5Line
            className="text-3xl cursor-pointer text-red-500"
            onClick={handleRemove}
          />
        </div>
      </header>
      <div className="py-10 px-5 border-y-2">
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
            <Button label={"Vrátiť"} onClick={handleReturnToLibrary} />
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
              Požičať
            </Link>
          </div>
        )}
      </div>
      <div className="flex gap-x-5 pt-10">
        <aside className="w-2/6 h-96">
          <img src={"/book.svg"} alt="book" className="w-full h-full" />
        </aside>
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

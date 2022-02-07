import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { LibraryAtom } from "../../global/recoil/LibraryAtom";
import { UserType } from "../../global/types/UserType";
import UserCard from "./UserCard";
import { useLocation, useParams } from "react-router-dom";
import { BookType } from "../../global/types/BookType";

const RentBook = () => {
  const nameRef = useRef<any | null>(null);
  const library = useRecoilValue(LibraryAtom);
  const [bookDetail, setBookDetail] = useState<BookType | null>(null);
  const [searchedUsers, setSearchedUsers] = useState<UserType[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const { id }: { id: string } = useParams();
  const {
    state,
  }: {
    state: {
      bookDetail: BookType;
    };
  } = useLocation();

  useEffect(() => {
    if (state?.bookDetail) setBookDetail(state?.bookDetail);
    if (!state?.bookDetail) {
      const fetchDetails = async () => {
        await axios
          .get(`/api/book/${id}`)
          .then((res) => setBookDetail(res?.data?.book));
      };
      fetchDetails();
    }
  }, [state, id]);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios
      .get(
        `/api/${library?.library?._id}/users?keyword=${nameRef.current?.value}`
      )
      .then((res) => setSearchedUsers(res?.data?.users));
  };

  const handleRent = async () => {
    console.log("rent");
    const newDate = new Date();
    let updatedUser = {
      ...selectedUser,
      borrowed: selectedUser?.borrowedBooks.push({
        bookId: bookDetail?._id,
        date: newDate.toISOString(),
      }),
    };
    const updatedBook = {
      ...bookDetail,
        isBorrowed: true,
        whoBorrowed: selectedUser?._id,
        borrowedDate: newDate.toISOString(),
    };
    await axios
      .put(`/api/user/${selectedUser?._id}`, updatedUser)
      .then((res) => console.log(res.status));
    await axios
      .put(`/api/book/${bookDetail?._id}`, updatedBook)
      .then((res) => console.log(res.status));

    console.log();
  };

  return (
    <div>
      <div className="my-5 py-3 flex justify-between items-center border-b-2 ">
        <div>Čo: {bookDetail?.title}</div>
        <div>
          Kto: {selectedUser?.firstName} {selectedUser?.lastName}
        </div>
        <button onClick={handleRent} disabled={selectedUser === null}>
          Požičaj
        </button>
      </div>
      <div className="flex gap-x-5">
        <div className="flex-1">book detail: {bookDetail?.title}</div>
        <div className="flex-1">
          <form
            onSubmit={handleSubmit}
            className="mb-5 justify-between flex gap-x-5"
          >
            <input
              type="text"
              placeholder="Hľadaj podľa priezviska ..."
              ref={nameRef}
              className="w-full"
            />
            <button>Hľadaj</button>
          </form>
          <div>
            {selectedUser ? (
              <>
                <UserCard user={selectedUser} />
                <div
                  className="text-right"
                  onClick={() => setSelectedUser(null)}
                >
                  <button className="scale-90 ">Späť</button>
                </div>
              </>
            ) : (
              searchedUsers?.map((user: UserType) => (
                <div
                  key={user._id}
                  className="flex px-2 py-3 text-xl border hover:bg-gray-500 transition cursor-pointer"
                  onClick={() => setSelectedUser(user)}
                >
                  {user.firstName} {user.lastName}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentBook;

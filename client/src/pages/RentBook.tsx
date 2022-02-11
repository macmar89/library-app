import axios from "axios";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { useLocation, useParams } from "react-router-dom";
import { LibraryAtom } from "../global/recoil/LibraryAtom";
import { UserCard } from "../global/components/UserCard";
import { BookType } from "../global/types/BookType";
import { UserType } from "../global/types/UserType";
import Button from "../global/components/Ui/Button";
import Pagination from "../global/components/Pagination";

const RentBook = () => {
  const nameRef = useRef<any | null>(null);
  const library = useRecoilValue(LibraryAtom);
  const [bookDetail, setBookDetail] = useState<BookType | null>(null);
  const [searchedUsers, setSearchedUsers] = useState<any | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [usersCurrentPage, setUsersCurrentPage] = useState<number>(1);
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
      .then((res) => setSearchedUsers(res?.data))
      .then(() => console.log(searchedUsers));
  };

  const handleRent = async () => {
    const newDate = new Date();
    let updatedUser = {
      ...selectedUser,
      borrowed: selectedUser?.borrowedBooks?.push({
        book: bookDetail?._id,
        date: newDate.toISOString(),
      }),
    };
    const updatedBook = {
      ...bookDetail,
      borrowed: {
        isBorrowed: true,
        whoBorrowed: selectedUser?._id,
        borrowedDate: newDate.toISOString(),
      },
    };

    await axios
      .put(`/api/user/${selectedUser?._id}`, updatedUser)
      .then((res) => console.log(res.status));
    await axios
      .put(`/api/book/${bookDetail?._id}`, updatedBook)
      .then((res) => console.log(res.status));
  };

  const countOfPages = Math.ceil(
    searchedUsers?.userCount / searchedUsers?.resultPerPage
  );

  return (
    <div>
      <div className="my-5 py-3 flex justify-between items-center border-b-2 ">
        <div className="flex items-baseline gap-x-3">
          <span>Kniha:</span> <h3>{bookDetail?.title}</h3>
        </div>
        <div className="flex items-baseline gap-x-3">
          <span>Študent:</span>{" "}
          <h3>
            {selectedUser?.firstName} {selectedUser?.lastName}
          </h3>
        </div>
        <Button
          label={"Požičaj"}
          onClick={handleRent}
          disabled={selectedUser === null}
        />
      </div>
      <div className="flex gap-x-5">
        <div className="flex-1">
          <div>
            <div className="flex items-baseline gap-x-3">
              <span>Titul:</span>
              <h3>{bookDetail?.title}</h3>
            </div>
            <div className="flex items-baseline gap-x-3">
              <span>Autor:</span>
              <h3>{bookDetail?.author}</h3>
            </div>
            <div className="flex items-baseline gap-x-3">
              <span>Rok vydania:</span>
              <h3>{bookDetail?.yearOfRelease}</h3>
            </div>
          </div>
        </div>
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
            <Button label={"Hľadaj"} />
          </form>
          <div>
            {selectedUser ? (
              <>
                <UserCard user={selectedUser} totalBooks={0} currentBooks={0} />
                <div
                  className="text-right"
                  onClick={() => setSelectedUser(null)}
                >
                  <Button
                    label="Späť"
                    className="scale-90 btn-secondary mt-3"
                  />
                </div>
              </>
            ) : (
              searchedUsers?.users?.map((user: UserType) => (
                <div
                  key={user._id}
                  className="flex px-2 py-3 text-xl border hover:bg-gray-500 transition cursor-pointer"
                  onClick={() => setSelectedUser(user)}
                >
                  {user.firstName} {user.lastName}
                </div>
              ))
            )}
            {countOfPages > 0 && !selectedUser && (
              <Pagination
                setCurrentPage={setUsersCurrentPage}
                countOfPages={countOfPages}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentBook;

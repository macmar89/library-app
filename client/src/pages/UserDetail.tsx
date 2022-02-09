import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { UserCard } from "../global/components/UserCard";
import { UserType } from "../global/types/UserType";
import { LibraryAtom } from "../global/recoil/LibraryAtom";
import { LastFiveBookList } from "../global/components/LastFiveBookList";

interface IUser {
  student: UserType;
  currentBorrowedBooks: number;
  totalBorrowedBooks: number;
}

const UserDetail = () => {
  const { id }: { id: string } = useParams();
  const [userDetail, setUserDetail] = useState<IUser | null>(null);
  const library = useRecoilValue(LibraryAtom);

  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get(`/api/user/${id}`)
        .then((res) => setUserDetail(res?.data))
        .catch((err) => console.log(err));
    };
    fetchUser();
  }, [id]);

  return (
    <div className="grid grid-cols-2 gap-x-10 mt-10">
      <div className="">
        <UserCard
          user={userDetail?.student}
          currentBooks={userDetail?.currentBorrowedBooks}
          totalBooks={userDetail?.totalBorrowedBooks}
        />
      </div>
      <aside className="flex flex-col">
        <div className="mb-10">
          <h2 className="text-center">momentálne požičané knihy</h2>
          {userDetail?.student?.borrowedBooks &&
          userDetail?.student?.borrowedBooks?.length > 0 ? (
            <LastFiveBookList
              books={userDetail?.student?.borrowedBooks}
              slug={library?.library?.slug}
            />
          ) : (
            <div className="pt-8 text-gray-700 uppercase text-center ">
              <h4>Momentálne žiadna požičaná knih</h4>
            </div>
          )}
        </div>
        <div>
          <h2 className="text-center">História požičaných kníh</h2>
          {userDetail?.student?.history &&
          userDetail?.student?.history?.length > 0 ? (
            <LastFiveBookList
              books={userDetail?.student?.history}
              slug={library?.library?.slug}
            />
          ) : (
            <div className="pt-8 text-gray-700 uppercase text-center ">
              <h4>Zatiaľ žiadne vrátené knihy</h4>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default UserDetail;

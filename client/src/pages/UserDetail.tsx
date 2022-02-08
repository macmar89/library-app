import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { UserCard } from "../global/components/UserCard";
import { UserType } from "../global/types/UserType";
import { LibraryAtom } from "../global/recoil/LibraryAtom";

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
    <div>
      <UserCard user={userDetail?.student} />

      <div className="flex justify-between items-start my-5">
        <div className="flex items-center gap-x-3">
          <h1 className="">{userDetail?.currentBorrowedBooks}</h1>
          <h3>momentálne požičaných kníh</h3>
        </div>
        <div>
          <div className="flex items-center gap-x-3">
            <h1 className="">{userDetail?.totalBorrowedBooks}</h1>
            <h3>požičaných a vrátených kníh</h3>
          </div>

          <ul>
            {userDetail?.student?.history?.slice(0, 3).map((book: any) => (
              <li key={book._id}>
                <Link
                  to={`/library/${library?.library?.slug}/kniha/${book.book?._id}`}
                >
                  {book.book?.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;

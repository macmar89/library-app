import React from "react";
import { Link } from "react-router-dom";
import { UserType } from "../../global/types/UserType";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import { useSetRecoilState } from "recoil";
import { UserAtom } from "../../global/recoil/UserAtom";

interface UserCardProps {
  user?: UserType;
  totalBooks?: number;
  currentBooks?: number;
  userUrl?: string;
  editUrl?: string;
  removeUser?: any;
}

export const UserCard = ({
  user,
  totalBooks,
  currentBooks,
  userUrl,
  editUrl,
  removeUser,
}: UserCardProps) => {
  const setUser = useSetRecoilState(UserAtom);

  return (
    <div className="relative border-2 py-8 px-10 rounded-xl bg-gray-200">
      <div className="flex justify-center">
        <img src="/monkey.svg" width={200} alt="profile" />
      </div>
      <h2 className="text-center mb-2 ">
        {userUrl ? (
          <Link to={userUrl}>
            {user?.firstName} {user?.lastName}
          </Link>
        ) : (
          <>
            {user?.firstName} {user?.lastName}
          </>
        )}
      </h2>
      <h4 className="text-center border-b border-gray-900 pb-4">
        {user?.email}
      </h4>
      <div
        className={`flex justify-between ${
          userUrl && "border-b border-gray-900"
        } py-4`}
      >
        <div>
          <strong>{currentBooks}</strong> momentálne požičaných
        </div>
        <div>
          <strong>{totalBooks}</strong> celkovo požičaných
        </div>
      </div>
      {userUrl && editUrl && user && (
        <footer className="flex pt-5 items-center justify-end gap-x-5">
          <Link to={editUrl} onClick={() => setUser(user)}>
            <RiEdit2Line className="homepage-icon text-teal-700" />
          </Link>
          <RiDeleteBin5Line
            className="homepage-icon text-red-600"
            onClick={() => removeUser(user?._id)}
          />
          <Link className="btn btn-primary" to={userUrl}>
            Profil
          </Link>
        </footer>
      )}
    </div>
  );
};

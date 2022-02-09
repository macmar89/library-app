import React from "react";
import { Link, useHistory } from "react-router-dom";
import { UserType } from "../types/UserType";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import axios from "axios";

interface UserCardProps {
  user: UserType | undefined;
  totalBooks?: number;
  currentBooks?: number;
  url?: string;
}

export const UserCard = ({
  user,
  totalBooks,
  currentBooks,
  url,
}: UserCardProps) => {
  const history = useHistory();

  const handleRemove = async () => {
    await axios
      .delete("/api/user/" + user?._id)
      .then(() =>
        history.push(`${url?.slice(0, url?.lastIndexOf("/")) + "ia"}`)
      );
  };

  return (
    <div className="border-2 py-8 px-10 rounded-xl bg-gray-200">
      <div className="flex justify-center">
        <img src="/monkey.svg" width={200} alt="profile" />
      </div>
      <h2 className="text-center mb-2 ">
        {url ? (
          <Link to={url}>
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
      <div className="flex justify-between border-b border-gray-900 py-4">
        <div>
          <strong>{currentBooks}</strong> momentálne požičaných
        </div>
        <div>
          <strong>{totalBooks}</strong> celkovo požičaných
        </div>
      </div>
      {url && (
        <footer className="pt-5 flex items-center justify-end gap-x-5">
          <Link
            to={{
              pathname: "/",
              // pathname: `/uprav-kniznicu/${chosenLibrary?.slug}`,
              // state: { library: chosenLibrary },
            }}
          >
            <RiEdit2Line className="homepage-icon text-teal-700" />
          </Link>
          <RiDeleteBin5Line
            className="homepage-icon text-red-600"
            onClick={handleRemove}
          />
          <Link className="btn btn-primary" to={url}>
            Profil
          </Link>
        </footer>
      )}
    </div>
  );
};

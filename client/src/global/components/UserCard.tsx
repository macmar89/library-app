import React from "react";
import { Link } from "react-router-dom";
import { UserType } from "../types/UserType";

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
  return (
    <div className="border-2 py-5 px-10 rounded-xl bg-gray-200">
      <div className="flex justify-center">
        <img src="/monkey.svg" width={200} alt="profile" />
      </div>
      <h2 className="text-center mb-2">
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
      <h4 className="text-center mb-2">{user?.email}</h4>
      <div className="flex justify-between">
        <div>
          <strong>{currentBooks}</strong> momentálne požičaných
        </div>
        <div>
          <strong>{totalBooks}</strong> celkovo požičaných
        </div>
      </div>
    </div>
  );
};

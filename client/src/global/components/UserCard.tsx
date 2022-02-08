import React from "react";
import { UserType } from "../types/UserType";

interface UserCardProps {
  user: UserType | undefined;
  totalBooks?: number;
  currentBooks?: number;
}

export const UserCard = ({ user, totalBooks, currentBooks }: UserCardProps) => {
  console.log(user);

  return (
    <div className="border-2 py-5 px-10 rounded-xl bg-gray-200">
      <div className="flex justify-center">
        <img src="/monkey.svg" width={200} alt="profile" />
      </div>
      <h2 className='text-center mb-2'>
        {user?.firstName} {user?.lastName}
      </h2>
      <h4 className='text-center mb-2'>{user?.email}</h4>
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

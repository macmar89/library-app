import React from "react";
import { UserType } from "../types/UserType";

export const UserCard = ({ user }: { user: UserType | undefined }) => {

  return (
    <div className="border-2 w-1/2 mx-auto py-5 px-10 rounded-xl bg-gray-200 text-center">
      <div className='flex justify-center'>
        <img src="/monkey.svg" width={200} alt="profile" />
      </div>
      <h2>
        {user?.firstName} {user?.lastName}
      </h2>
      <h3>{user?.email}</h3>
    </div>
  );
};

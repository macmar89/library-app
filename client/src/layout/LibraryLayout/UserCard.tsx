import React from "react";
import { UserType } from "../../global/types/UserType";

interface UserCardProps {
  user: UserType;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="w-5/6 mx-auto mb-5 border rounded">
      <h4 className='text-center my-2'>
        {user?.firstName} {user?.lastName}
      </h4>
      <h6>{user?.email}</h6>
      <button>Požičaj</button>
    </div>
  );
};

export default UserCard;

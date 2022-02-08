import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { UserType } from "../global/types/UserType";
import {formatDate} from "../global/helpers/Moment";

const UserDetail = () => {
  const { id }: { id: string } = useParams();
  const [userDetail, setUserDetail] = useState<UserType | null>(null);

  console.log(userDetail)

  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get(`/api/user/${id}`)
        .then((res) => setUserDetail(res?.data?.student))
        .catch((err) => console.log(err));
    };
    fetchUser();
  }, [id]);

  return <div>user detail: {userDetail?.firstName}
      <ul>
        {userDetail?.borrowedBooks?.map((book: any)=> (
          <li key={book?.bookId}>
            pozicanie: {formatDate(book?.date)}
          </li>
        ))}
      </ul>

  </div>;
};

export default UserDetail;

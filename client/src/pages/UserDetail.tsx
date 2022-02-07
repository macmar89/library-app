import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { UserType } from "../global/types/UserType";

const UserDetail = () => {
  const { id }: { id: string } = useParams();
  const [userDetail, setUserDetail] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get(`/api/user/${id}`)
        .then((res) => setUserDetail(res?.data?.student))
        .catch((err) => console.log(err));
    };
    fetchUser();
  }, [id]);

  return <div>user detail: {userDetail?.firstName}</div>;
};

export default UserDetail;

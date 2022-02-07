import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { LibraryAtom } from "../../global/recoil/LibraryAtom";
import axios from "axios";
import { UserType } from "../../global/types/UserType";
import Pagination from "../../global/components/Pagination";

interface IUsers {
  success: true
  users: UserType[]
  userCount: number
  resultPerPage: number
}

const AllUsers = () => {
  const [users, setUsers] = useState<IUsers | any>([]);
  const library = useRecoilValue(LibraryAtom);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      const id = library?.library?._id;
      const res = await axios.get(currentPage === 1 ? `/api/${id}/users` : `/api/${id}/users/?page=${currentPage}`);
      if (res?.data?.success) {
        setUsers(res?.data);
      }
      if (!res?.data?.success) {
        return <div>smolka</div>;
      }
    };
    fetchUsers();
  }, [library, currentPage]);

  const countOfPages = Math.ceil(users?.userCount / users?.resultPerPage)
  console.log(`userCount: ${users?.userCount} - user length: ${users?.users?.length} - countOfPages: ${countOfPages}`)

  return (
    <div className="container">
      <div>
        {users?.users?.map((user: UserType) => (
          <div key={user._id}>{user.firstName} {user.lastName}</div>
        ))}
      </div>

      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} countOfPages={countOfPages} />
    </div>
  );
};

export default AllUsers;

import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LibraryAtom } from "../../global/recoil/LibraryAtom";
import axios from "axios";
import { UserType } from "../../global/types/UserType";
import Pagination from "../../global/components/Pagination";

interface IUsers {
  success: true;
  users: UserType[];
  userCount: number;
  resultPerPage: number;
}

const AllUsers = () => {
  const [users, setUsers] = useState<IUsers | any>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserType[] | null>(null);
  const library = useRecoilValue(LibraryAtom);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedLastName, setSearchedLastName] = useState<string>("");
  const { url } = useRouteMatch();

  const id = library?.library?._id;

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        currentPage === 1
          ? `/api/${id}/users`
          : `/api/${id}/users/?page=${currentPage}`
      );
      if (res?.data?.success) {
        setUsers(res?.data);
      }
      if (!res?.data?.success) {
        return <div>smolka</div>;
      }
    };
    fetchUsers();
  }, [library, currentPage, id]);

  const countOfPages = Math.ceil(users?.userCount / users?.resultPerPage);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.get(
      `/api/${id}/users?lastName=${searchedLastName}`
    );
    setSearchedLastName("");
    setFilteredUsers(res?.data.users);
  };

  return (
    <div>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={"Zadaj hľadané priezvisko ..."}
            name="lastName"
            value={searchedLastName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchedLastName(e.target.value)
            }
          />

          <button>Hľadať</button>
        </form>
      </div>
      <div className="">
        {filteredUsers ? (
          <>
            {filteredUsers?.map((user: UserType) => (
              <div key={user._id} className="py-2 bg-pink-500">
                {user.firstName} {user.lastName}
              </div>
            ))}
            <span
              className="cursor-pointer underline text-right"
              onClick={() => setFilteredUsers(null)}
            >
              Späť na všetkých používateľov
            </span>
          </>
        ) : (
          users?.users?.map((user: UserType) => (
            <Link
              to={`${url.slice(0, url.lastIndexOf('/'))}/uzivatel/${user._id}`}
              key={user._id}
              className="flex px-2 py-3 text-xl border hover:bg-gray-500 transition cursor-pointer"
            >
              <div className="w-3/12">{user.firstName}</div>
              <div className="w-3/12">{user.lastName} </div>
              <div className="w-4/12">{user.email}</div>
              <div className="w-1/12">{3}</div>
              <div className="w-1/12 justify-center flex">detail</div>
            </Link>
          ))
        )}
      </div>
      {countOfPages > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          countOfPages={countOfPages}
        />
      )}
    </div>
  );
};

export default AllUsers;

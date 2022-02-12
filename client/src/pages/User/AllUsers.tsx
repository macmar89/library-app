import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LibraryAtom } from "../../global/recoil/LibraryAtom";
import axios from "axios";
import { UserType } from "../../global/types/UserType";
import { Pagination } from "../../global/components/Pagination";
import { UserCard } from "../../layout/User/UserCard";
import { Button } from "../../global/components/Button";
import {toast} from "react-toastify";

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchedLastName, setSearchedLastName] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const { url } = useRouteMatch();

  const id = library?.library?._id;

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

  useEffect(() => {
    fetchUsers();
  }, [library, currentPage, id]);

  const countOfPages = Math.ceil(users?.userCount / users?.resultPerPage);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.get(`/api/${id}/users?keyword=${searchedLastName}`);
    setSearchedLastName("");
    setFilteredUsers(res?.data.users);
  };

  const handleRemove = async (id: string ) => {
    const agreement = window.confirm("Chcete vymazať užívateľa?");

    if (agreement) {
      await axios
        .delete("/api/user/" + id).then(() => toast('Užívateľ úspešne vymazaný'))
        .then(() => setSelectedUser(null))
        .then(() =>
          fetchUsers()
        ).catch(( ) => toast('Niečo sa nepodarilo'))
    }
    if (!agreement) return;
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-x-5">
        <input
          type="text"
          placeholder={"Zadaj hľadané priezvisko ..."}
          name="lastName"
          value={searchedLastName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchedLastName(e.target.value)
          }
          className="w-full"
        />

        <Button label={"Hľadať"} />
      </form>

      <div className={`flex gap-x-10 mt-10 overlay-hidden`}>
        <div className={`${selectedUser ? "w-1/2" : "w-full"}`}>
          {filteredUsers ? (
            <>
              {filteredUsers?.map((user: UserType) => (
                <div
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className="flex px-2 py-3 text-xl border hover:bg-gray-500 transition cursor-pointer"
                >
                  <div className="w-4/6">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="w-2/6 justify-end flex underline ">
                    klikni pre detail
                  </div>
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
              <div
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className="flex px-2 py-3 text-xl border hover:bg-gray-500 transition cursor-pointer"
              >
                <div className="w-4/6">
                  {user.firstName} {user.lastName}
                </div>
                <div className="w-2/6 justify-end flex underline">
                  klikni pre detail
                </div>
              </div>
            ))
          )}
        </div>
        {selectedUser && (
          <div className={"w-1/2"}>
            <UserCard
              user={selectedUser}
              currentBooks={selectedUser?.borrowedBooks?.length}
              totalBooks={selectedUser?.history?.length}
              userUrl={`${url.slice(0, url.lastIndexOf("/"))}/uzivatel/${
                selectedUser._id
              }`}
              editUrl={`${url.slice(0, url.lastIndexOf("/"))}/uzivatel/${
                selectedUser._id
              }/uprav`}
              removeUser={handleRemove}
            />
          </div>
        )}
      </div>
      {countOfPages > 1 && (
        <Pagination
          setCurrentPage={setCurrentPage}
          countOfPages={countOfPages}
        />
      )}
    </div>
  );
};

export default AllUsers;

import React from "react";
import { Link } from "react-router-dom";

interface LastUserList {
  title: string;
  users: any;
  slug: string;
  className?: string;
  url?: string;
  emptyLabel: string;
  count?: number;
}

export const LastUserList = ({
  title,
  users,
  slug,
  className,
  url,
  emptyLabel,
  count,
}: LastUserList) => {

  return (
    <div className={`border rounded-xl p-5 shadow-xl ${className}`}>
      <h2 className="text-center mb-5">{title}</h2>
      {users && users?.length > 0 ? (
        <>
          <ul>
            {users?.slice(0, count || 5).map((user: any, index: number) => (
              <li key={index} className="border-b py-2 pl-1.5 last:border-0 ">
                <h4>
                  <Link to={`/kniznica/${slug}/uzivatel/${user.user?._id || user?._id}`}>
                    {user.firstName} {user.lastName}
                  </Link>
                </h4>
              </li>
            ))}
          </ul>
          {url && (
            <div className={"py-2 text-right text-xl text-gray-700 uppercase"}>
              <Link to={{pathname: url, state: {users: users}}}>Zobraziť celý zoznam</Link>
            </div>
          )}
        </>
      ) : (
        <div className="pt-2 text-gray-700 uppercase text-center ">
          <h4>{emptyLabel}</h4>
        </div>
      )}
    </div>
  );
};

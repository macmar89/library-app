import React from "react";
import {Link, useRouteMatch} from "react-router-dom";

export const Navbar = () => {
  const  {url}  = useRouteMatch()

  return (
    <div className="bg-teal-500 h-12 flex justify-between items-center">
      <main>
        <Link to={`${url}`} className="nav-link">
          Home
        </Link>
        <Link to={`${url}/knihy`} className="nav-link">
          Knihy
        </Link>
        <Link to={`${url}/uzivatelia`} className="nav-link">
          Užívatelia
        </Link>
      </main>
      <aside>
        <Link to={`${url}/pridaj-knihu`} className="nav-link">
          Pridaj knihu
        </Link>
        <Link to={`${url}/pridaj-uzivatela`} className="nav-link">
          Pridaj užívateľa
        </Link>
      </aside>
    </div>
  );
};



import React from "react";
import {Link, useRouteMatch} from "react-router-dom";

const Navbar = () => {
  const  {url}  = useRouteMatch()

  return (
    <div className="bg-red-300 h-12 flex justify-between items-center">
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
        <Link to={`${url}/pridaj-užívateľa`} className="nav-link">
          Pridaj užívateľa
        </Link>
      </aside>
    </div>
  );
};

export default Navbar;

import axios from "axios";
import React, { useEffect } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Route, Switch, useParams, useRouteMatch, Link } from "react-router-dom";
import { useRecoilState } from "recoil";

import AddNewBook from "../../pages/Book/AddNewBook";
import AddNewUser from "../../pages/User/AddNewUser";
import AllBooks from "../../pages/Book/AllBooks";
import AllUsers from "../../pages/User/AllUsers";
import UserDetail from "../../pages/User/UserDetail";
import BookDetail from "../../pages/Book/BookDetail";
import RentBook from "../../pages/Book/RentBook";
import UserEdit from "../../pages/User/UserEdit";
import NoMatch from "../../pages/NoMatch";
import UserHistory from "../../pages/User/UserHistory";
import BookEdit from "../../pages/Book/BookEdit";

import { Navbar } from "../../global/components/Navbar";

import { LibraryAtom } from "../../global/recoil/LibraryAtom";
import LibraryDashboard from "../../pages/Library/LibraryDashboard";

export const LibraryLayout = () => {
  const { url } = useRouteMatch();
  const { slug }: { slug: string } = useParams();
  const [library, setLibrary] = useRecoilState(LibraryAtom);

  useEffect(() => {
    const fetchLibraryData = async () => {
      await axios
        .get(`/api/library/${slug}`)
        .then((res) => setLibrary(res?.data))
        .catch((err) => console.log(err));
    };
    fetchLibraryData();
  }, [slug, setLibrary]);

  return (
    <div className="min-h-screen relative">
      <header className="h-40 flex justify-center items-center relative">
        <h1>{library?.library?.name}</h1>
        <Link to={"/"}>
          <FaArrowCircleLeft className="absolute top-2/4 -translate-y-2/4 left-10 text-4xl cursor-pointer" />
        </Link>
      </header>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path={`${url}/`} exact component={LibraryDashboard} />
          <Route path={`${url}/knihy`} component={AllBooks} />
          <Route path={`${url}/uzivatelia`} component={AllUsers} />
          <Route path={`${url}/pridaj-knihu`} component={AddNewBook} />
          <Route path={`${url}/pridaj-uzivatela`} component={AddNewUser} />
          <Route path={`${url}/uzivatel/:id`} exact component={UserDetail} />
          <Route
            path={`${url}/uzivatel/:id/uprav`}
            exact
            component={UserEdit}
          />
          <Route
            path={`${url}/uzivatel/:id/historia`}
            exact
            component={UserHistory}
          />
          <Route path={`${url}/kniha/:id`} exact component={BookDetail} />
          <Route path={`${url}/kniha/:id/uprav`} exact component={BookEdit} />
          <Route path={`${url}/pozicaj/:id`} component={RentBook} />
          <Route path={`${url}/*`} component={NoMatch} />
        </Switch>
      </div>
    </div>
  );
};

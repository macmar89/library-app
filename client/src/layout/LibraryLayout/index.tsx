import axios from "axios";
import React, { useEffect } from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
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
import BookEdit from '../../pages/Book/BookEdit'

import { Navbar } from "../../global/components/Navbar";

import { LibraryAtom } from "../../global/recoil/LibraryAtom";

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
      <h1>{library?.library?.name}</h1>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path={`${url}/knihy`} component={AllBooks} />
          <Route path={`${url}/uzivatelia`} component={AllUsers} />
          <Route path={`${url}/pridaj-knihu`} component={AddNewBook} />
          <Route path={`${url}/pridaj-uzivatela`} component={AddNewUser} />
          <Route path={`${url}/uzivatel/:id`} exact component={UserDetail} />
          <Route path={`${url}/uzivatel/:id/uprav`} exact component={UserEdit} />
          <Route path={`${url}/uzivatel/:id/historia`} exact component={UserHistory} />
          <Route path={`${url}/kniha/:id`} exact component={BookDetail} />
          <Route path={`${url}/kniha/:id/uprav`} exact component={BookEdit} />
          <Route path={`${url}/pozicaj/:id`} component={RentBook} />
          <Route path={`${url}/*`} component={NoMatch} />

        </Switch>
      </div>
    </div>
  );
};


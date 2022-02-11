import React, { useEffect } from "react";
import Navbar from "../../global/components/Navbar";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { useRecoilState } from "recoil";
import { LibraryAtom } from "../../global/recoil/LibraryAtom";
import axios from "axios";
import AddNewBook from "../BookDetailLayout/AddNewBook";
import AddNewUser from "../../pages/AddNewUser";
import AllBooks from "./AllBooks";
import AllUsers from "./AllUsers";
import UserDetail from "../../pages/UserDetail";
import BookDetail from "../../pages/BookDetail";
import RentBook from "./RentBook";
import {EditUser} from "../UserLayout/UserEdit";
import NoMatch from "../../pages/NoMatch";
import UserHistory from "../UserLayout/UserHistory";

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

  console.log('index', library)

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
          <Route path={`${url}/uzivatel/:id/uprav`} exact component={EditUser} />
          <Route path={`${url}/uzivatel/:id/historia`} exact component={UserHistory} />
          <Route path={`${url}/kniha/:id`} component={BookDetail} />
          <Route path={`${url}/pozicaj/:id`} component={RentBook} />
          <Route path={`${url}/*`} component={NoMatch} />

        </Switch>
      </div>
    </div>
  );
};


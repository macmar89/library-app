import React, { useEffect } from "react";
import Navbar from "../../global/components/Navbar";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import LibraryDashboard from "../../pages/LibraryDashboard";
import BookDetail from "../../pages/BookDetail";
import Books from "../../pages/Books";
import { useRecoilState } from "recoil";
import { LibraryAtom } from "../../global/recoil/LibraryAtom";
import axios from "axios";

const LibraryLayout = () => {
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
      <Switch>
        <Route path={`${url}/`} component={LibraryDashboard} />
        <Route path={`${url}/knihy`} component={Books} />
        <Route path={`${url}/uzivatelia`} component={BookDetail} />
      </Switch>
    </div>
  );
};

export default LibraryLayout;

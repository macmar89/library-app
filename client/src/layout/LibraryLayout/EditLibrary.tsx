import React, { useEffect } from "react";
import { LibraryForm } from "./LibraryForm";
import { useHistory, useLocation, Link } from "react-router-dom";
import { LibraryType } from "../../global/types/LibraryTypes";

const EditLibrary = () => {
  const {
    state,
  }: {
    state: {
      library: LibraryType;
    };
  } = useLocation();
  const history = useHistory();

  useEffect(() => {}, []);

  if (!state) history.goBack();

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col relative">
      <div>
        <LibraryForm title={"Uprav knižnicu"} library={state?.library} />
        <div className="mt-10 text-right">
          <Link to={'/'} className="btn btn-secondary">
            Späť
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditLibrary;

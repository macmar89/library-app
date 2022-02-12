import React, { useEffect } from "react";
import { LibraryForm } from "../../layout/LibraryLayout/LibraryForm";
import { useHistory, Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LibraryAtom } from "../../global/recoil/LibraryAtom";

const EditLibrary = () => {
  const library = useRecoilValue(LibraryAtom);

  const history = useHistory();

  useEffect(() => {}, []);

  if (!library) history.goBack();

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col relative">
      <div>
        <LibraryForm title={"Uprav knižnicu"} library={library} />
        <div className="mt-10 text-right">
          <Link to={"/"} className="btn btn-secondary">
            Späť
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditLibrary;

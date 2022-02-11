import React from "react";
import { LibraryForm } from "../layout/LibraryLayout/LibraryForm";
import { Link } from "react-router-dom";

const AddNewLibrary = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col relative">
      <div>
        <LibraryForm title="Pridaj novú knižnicu" />
        <div className="mt-10 text-right">
          <Link to={"/"} className="btn btn-secondary">
            Späť
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddNewLibrary;

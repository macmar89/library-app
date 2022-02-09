import React from "react";
import { LibraryForm } from "./LibraryForm";

const AddNewLibrary = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col relative">
      <LibraryForm title="Pridaj novú knižnicu" />
    </div>
  );
};

export default AddNewLibrary;

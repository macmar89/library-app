import React, { ChangeEvent, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddNewLibrary = () => {
  const ref = useRef<any>(null);
  const history = useHistory();

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ref.current?.value) return;
    await axios
      .post("/api/library", { name: ref.current?.value })
      .then((res) => {
        return res.data?.library?.slug;
      })
      .then((slug) => history.push("/kniznica/" + slug));
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col relative">
      <h1>Pridaj novú knižnicu</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input type="text" ref={ref} />
        <button>Pridaj knižnicu</button>
      </form>
    </div>
  );
};

export default AddNewLibrary;

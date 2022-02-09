import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { GeneralAtom } from "../global/recoil/GeneralAtom";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import { LibraryType } from "../global/types/LibraryTypes";

const Homepage = () => {
  const [libraries, setLibraries] = useRecoilState(GeneralAtom);
  const [chosenLibrary, setChosenLibrary] = useState<LibraryType | null>(null);

  const fetchLibraries = async () => {
    const { data } = await axios.get("/api/libraries");
    setLibraries({ ...libraries, libraries: data?.libraries });
  };

  useEffect(() => {
    if (libraries?.libraries?.length > 0) return;
    fetchLibraries();
  }, [libraries, setLibraries]);

  const handleLibrary = (e: ChangeEvent<HTMLSelectElement>) => {
    const library = libraries?.libraries?.find(
      (lib: any) => e.target.value === lib._id
    );
    setChosenLibrary(library);
  };

  const handleRemove = async () => {
    await axios
      .delete(`/api/library/` + chosenLibrary?._id)
      .then(() => setChosenLibrary(null))
      .then(() => fetchLibraries());
  };

  const library = {
    name: "Nejaka kniznica",
    address: {
      street: "Energetikov",
      houseNumber: "205/48",
      postalCode: "971 01",
      city: "Prievidza city",
      state: "Slovakia",
      email: "naj.kniznica@gmail.com",
      phone: "+421 46 540 56 59",
    },
  };

  return (
    <div className="h-screen w-screen flex items-center flex-col relative">
      <div className="py-10 border w-full">
        <h1 className="text-10xl">Knižnica</h1>
      </div>

      <div className="space-x-3 my-5 tracking-wider">
        <strong className="text-2xl uppercase">Vstúp do knižnice</strong>{" "}
        <span>alebo</span>
        <Link className="text-2xl underline uppercase" to="/pridaj-kniznicu">
          vytvor novú knižnicu
        </Link>
      </div>

      <div className="flex items-center border w-1/4 mb-10">
        <select
          name="library"
          onChange={handleLibrary}
          className="w-full py-4 px-6 rounded cursor-pointer"
        >
          <option className="uppercase">-- Vyber knižnicu --</option>
          {libraries?.libraries?.map((lib: any) => (
            <option key={lib._id} value={lib._id}>
              {lib.name}
            </option>
          ))}
        </select>
      </div>
      {chosenLibrary && (
        <div className="border-2 w-1/3 py-5 px-16">
          <h1 className="border-b-2 pb-5">{chosenLibrary?.name}</h1>
          <main className="grid grid-cols-2 border-b-2 p-5">
            <div>
              <div>
                {library.address?.street} {library.address?.houseNumber}
              </div>
              <div>
                {library?.address?.postalCode} {library?.address?.city}
              </div>
              <div>
                <strong>email:</strong> {library?.address?.email}
              </div>
              <div>
                <strong>tel. č.:</strong>
                {library?.address?.phone}
              </div>
            </div>
            <div>
              <div>
                Počet študentov: <strong>{320}</strong>
              </div>
              <div>
                Počet kníh: <strong>{1024}</strong>
              </div>
            </div>
          </main>
          <footer className="pt-5 flex items-center justify-end gap-x-5">
            <Link to={`/uprav-kniznicu/${chosenLibrary}`}>
              <RiEdit2Line className="homepage-icon text-teal-700" />
            </Link>
            <RiDeleteBin5Line
              className="homepage-icon text-red-600"
              onClick={handleRemove}
            />
            <Link className="btn" to={`/kniznica/${chosenLibrary}`}>
              Vstúpiť do knižnice
            </Link>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Homepage;

import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useRecoilState, useSetRecoilState} from "recoil";
import { GeneralAtom } from "../global/recoil/GeneralAtom";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import { LibraryType } from "../global/types/LibraryTypes";
import {LibraryAtom} from "../global/recoil/LibraryAtom";

const Homepage = () => {
  const [libraries, setLibraries] = useRecoilState(GeneralAtom);
  const setLibrary = useSetRecoilState(LibraryAtom)
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
    setLibrary(library)
  };

  const handleRemove = async () => {
    await axios
      .delete(`/api/library/` + chosenLibrary?._id)
      .then(() => setChosenLibrary(null))
      .then(() => fetchLibraries());
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
        <div className="border-2 w-1/3 py-5 px-16 shadow-xl">
          <h1 className="border-b-2 pb-5">{chosenLibrary?.name}</h1>
          <main className="grid grid-cols-2 border-b-2 p-5">
            <div>
              <h5 className="mb-1 underline">Adresa:</h5>
              <div className="mb-2 pl-2">
                <div>{chosenLibrary.address?.street}</div>
                <div>
                  {chosenLibrary?.address?.postalCode}{" "}
                  {chosenLibrary?.address?.city}
                </div>
                <div>{chosenLibrary?.address?.state}</div>
              </div>
              <h5 className="mb-1 underline">Kontakt:</h5>
              <div className="pl-2">
                <div>{chosenLibrary?.contact?.email}</div>
                <div>{chosenLibrary?.contact?.phone}</div>
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
            <Link
              to={{
                pathname: `/uprav-kniznicu/${chosenLibrary?.slug}`,
                state: { library: chosenLibrary },
              }}
            >
              <RiEdit2Line className="homepage-icon text-teal-700" />
            </Link>
            <RiDeleteBin5Line
              className="homepage-icon text-red-600"
              onClick={handleRemove}
            />
            <Link className="btn btn-primary" to={`/kniznica/${chosenLibrary?.slug}`}>
              Vstúpiť do knižnice
            </Link>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Homepage;

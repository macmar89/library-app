import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { GeneralAtom } from "../global/recoil/GeneralAtom";
import { LibraryType } from "../global/types/LibraryTypes";
import { LibraryAtom } from "../global/recoil/LibraryAtom";
import LibraryCard from "../layout/LibraryLayout/LibraryCard";
import { toast } from "react-toastify";

const Homepage = () => {
  const [libraries, setLibraries] = useRecoilState(GeneralAtom);
  const setLibrary = useSetRecoilState(LibraryAtom);
  const [chosenLibrary, setChosenLibrary] = useState<LibraryType | null>(null);

  const fetchLibraries = async () => {
    const { data } = await axios.get("/api/libraries");
    setLibraries({ ...libraries, libraries: data?.libraries });
  };

  useEffect(() => {
    fetchLibraries();
  }, [setLibraries, libraries?.libraries?.length]);

  const handleLibrary = (e: ChangeEvent<HTMLSelectElement>) => {
    const library = libraries?.libraries?.find(
      (lib: any) => e.target.value === lib._id
    );
    setChosenLibrary(library);
    setLibrary(library);
  };

  const handleRemove = async (id: string) => {
    const agreement = window.confirm(`Chcete vymazať knižnicu?`);
    if (agreement) {
      await axios
        .delete(`/api/library/` + id)
        .then(() => setChosenLibrary(null))
        .then(() => toast("Knižnica bola vymazaná"))
        .then(() => fetchLibraries())
        .catch(() => toast("Niečo sa pokazilo. Knižnica nebola vymazaná"));
    }
    if (!agreement) return;
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
        <LibraryCard library={chosenLibrary} remove={handleRemove} />
      )}
    </div>
  );
};

export default Homepage;

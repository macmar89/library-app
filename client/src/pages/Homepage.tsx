import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { GeneralAtom } from "../global/recoil/GeneralAtom";
import {AiOutlinePlusCircle} from 'react-icons/ai'

const Homepage = () => {
  const [libraries, setLibraries] = useRecoilState(GeneralAtom);
  const [chosenLibrary, setChosenLibrary] = useState<string | null>(null);

  const fetchLibraries = async () => {
    const { data } = await axios.get("/api/libraries");
    setLibraries({ ...libraries, libraries: data?.libraries });
  };

  useEffect(() => {
    if (libraries?.libraries?.length > 0) return;

    fetchLibraries();
  }, [libraries, setLibraries]);

  const handleLibrary = (e: ChangeEvent<HTMLSelectElement>) => {
    setChosenLibrary(e.target.value);
    console.log(e.target.value);
  };

  const handleRemove = async () => {
    // await axios.delete(`/api/library`)
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col relative">
      <h1>Knižnica</h1>
      <Link to={'/pridaj-kniznicu'}>

      <AiOutlinePlusCircle className='absolute top-48 right-24 text-4xl' />
      </Link>


      <div className="flex items-center gap-x-3">
        <select
          name="library"
          onChange={handleLibrary}
          className="py-4 px-6 rounded"
        >
          {libraries?.libraries?.map((lib: any) => (
            <option key={lib._id} value={lib.slug}>
              {lib.name}
            </option>
          ))}
        </select>
        {/*  link vlozit do buttonu aby neukazovalo cestu ked je "chosenLibrary" null */}
        <Link
          to={{
            pathname: `/kniznica/${chosenLibrary}`,
          }}
          className={`btn ${chosenLibrary === null ? "opacity-30" : ""}`}
        >
          {/*<button className="" disabled={chosenLibrary === null}>*/}
          Vstúpiť
          {/*</button>*/}
        </Link>
        <RiDeleteBin5Line
          className="text-red-600 text-4xl"
          onClick={handleRemove}
        />
      </div>
    </div>
  );
};

export default Homepage;

import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { GeneralAtom } from "../global/recoil/GeneralAtom";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [libraries, setLibraries] = useRecoilState(GeneralAtom);
  const [chosenLibrary, setChosenLibrary] = useState<string | null>(null);

  useEffect(() => {
    if (libraries?.libraries?.length > 0) return;

    const fetchLibraries = async () => {
      const { data } = await axios.get("/api/libraries");
      setLibraries({ ...libraries, libraries: data?.libraries });
    };
    fetchLibraries();
  }, [libraries, setLibraries]);

  const handleLibrary = (e: ChangeEvent<HTMLSelectElement>) => {
    setChosenLibrary(e.target.value)
  };

  console.log(libraries)

  return (
    <div>
      <h2>Knižnica</h2>

      <div className='flex items-center gap-x-3'>
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
        <Link to={{
          pathname: `/library/${chosenLibrary}`
        }} className={`btn ${chosenLibrary === null ? "opacity-30" : ""}`} >
          {/*<button className="" disabled={chosenLibrary === null}>*/}
            Vstúpiť
          {/*</button>*/}
        </Link>
      </div>
    </div>
  );
};

export default Homepage;

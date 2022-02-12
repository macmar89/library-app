import React from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";

interface ILibraryProps {
  library: any;
  remove: any;
}

const LibraryCard = ({ library, remove }: ILibraryProps) => {
  return (
    <div className="border-2 w-1/2 2xl:w-1/3 py-5 px-16 shadow-xl">
      <header>
        <h1 className="border-b-2 pb-5">{library?.name}</h1>
      </header>
      <main className="grid grid-cols-2 border-b-2 p-5">
        <div>
          <h5 className="mb-1 underline">Adresa:</h5>
          <div className="mb-2 pl-2">
            <div>{library?.address?.street}</div>
            <div>
              {library?.address?.postalCode} {library?.address?.city}
            </div>
            <div>{library?.address?.state}</div>
          </div>
        </div>
        <div>
          <h5 className="mb-1 underline">Kontakt:</h5>
          <div className="pl-2">
            <div>{library?.contact?.email}</div>
            <div>{library?.contact?.phone}</div>
          </div>
        </div>
      </main>
      <footer className="pt-5 flex items-center justify-end gap-x-5">
        <Link
          to={{
            pathname: `/uprav-kniznicu/${library?.slug}`,
            state: { library: library },
          }}
          // onClick={() => setLibrary(library)}
        >
          <RiEdit2Line className="homepage-icon text-teal-700" />
        </Link>
        <RiDeleteBin5Line
          className="homepage-icon text-red-600"
          onClick={() => remove(library?._id)}
        />
        <Link className="btn btn-primary" to={`/kniznica/${library?.slug}`}>
          Vstúpiť do knižnice
        </Link>
      </footer>
    </div>
  );
};

export default LibraryCard;

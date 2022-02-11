import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LibraryAtom } from "../../global/recoil/LibraryAtom";


const LibraryDashboard = () => {
  const library = useRecoilValue(LibraryAtom);


  return (
    <div>
      <section className="flex my-5 gap-x-10">
        <div
          className={
            "border-2 border-gray-200 bg-gray-500 rounded-2xl px-8 py-5 "
          }
        >
          <h4 className="text-gray-900">Najnovšie pridané knihy</h4>
          {library?.newestBooks?.map((book: any) => (
            <div key={book._id} className="border-b py-2 pl-1">
              <Link to={`/${library?.library?.slug}/${book.slug}`}>
                {book.title}
              </Link>
            </div>
          ))}
        </div>
        <div
          className={"border-2 border-white bg-gray-500 rounded-2xl px-8 py-5 "}
        >
          <h4>Najnovšie pridaný užívatelia</h4>

          {library?.newestStudents?.map((student: any) => {
            const name = student.firstName + " " + student.lastName;
            return <div key={student._id}>{name}</div>;
          })}
        </div>
      </section>

    </div>
  );
};

export default LibraryDashboard;

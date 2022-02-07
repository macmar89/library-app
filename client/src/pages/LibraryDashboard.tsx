import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { LibraryType } from "../global/types/LibraryTypes";
import AddNewBook from "../layout/LibraryLayout/AddNewBook";
import { LibraryAtom } from "../global/recoil/LibraryAtom";
import AddNewUser from "../layout/LibraryLayout/AddNewUser";

interface IData {
  library: LibraryType;
  newestBooks: any;
  newestStudents: any;
}

const LibraryDashboard = () => {
  const [data, setData] = useState<IData | null>(null);
  const [library, setLibrary] = useRecoilState(LibraryAtom);
  const { slug }: { slug: string } = useParams();
  const [addNewBook, setAddNewBook] = useState<boolean>(false);
  const [addNewUser, setAddNewUser] = useState<boolean>(false);

  console.log(library?.library?.slug);

  useEffect(() => {
    const fetchLibraryDetails = async () => {
      await axios
        .get(`/api/library/${slug}`)
        .then((res) => {
          setData(res?.data);
          setLibrary(res?.data);
          console.log(res?.data);
        })
        .catch((err) => console.log(err));
    };
    fetchLibraryDetails();
  }, [slug]);

  return (
    <div className="min-h-screen relative">
      <h1>{data?.library?.name}</h1>
      <button
        onClick={() => {
          setAddNewBook(!addNewBook);
          setAddNewUser(false);
        }}
      >
        pridaj novu knihu
      </button>
      <button
        onClick={() => {
          setAddNewUser(!addNewUser);
          setAddNewBook(false);
        }}
      >
        user
      </button>
      <section className="flex my-5 gap-x-10">
        <div
          className={
            "border-2 border-gray-200 bg-gray-500 rounded-2xl px-8 py-5 "
          }
        >
          <h4 className="text-gray-900">Najnovšie pridané knihy</h4>
          {data?.newestBooks?.map((book: any) => (
            <div key={book._id} className="border-b py-2 pl-1">
              <Link to={`/${library?.library?.slug || slug}/${book._id}`}>
                {book.title}
              </Link>
            </div>
          ))}
        </div>
        <div
          className={"border-2 border-white bg-gray-500 rounded-2xl px-8 py-5 "}
        >
          <h4>Najnovšie pridaný užívatelia</h4>

          {data?.newestStudents?.map((student: any) => {
            const name = student.firstName + " " + student.lastName;
            return <div key={student._id}>{name}</div>;
          })}
        </div>
      </section>

      <AddNewBook open={addNewBook} setOpen={setAddNewBook} />
      <AddNewUser open={addNewUser} setOpen={setAddNewUser} />
    </div>
  );
};

export default LibraryDashboard;

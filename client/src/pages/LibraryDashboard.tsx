import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Library } from "../global/types/LibraryTypes";
import AddNewBook from "../layout/LibraryLayout/AddNewBook";
import { useRecoilState } from "recoil";
import { LibraryAtom } from "../global/recoil/LibraryAtom";

interface IData {
  library: Library;
  newestBooks: any;
  newestStudents: any;
}

const LibraryDashboard = () => {
  const [data, setData] = useState<IData | null>(null);
  const [library, setLibrary] = useRecoilState(LibraryAtom);
  const { slug }: { slug: string } = useParams();
  const [addNewBook, setAddNewBook] = useState(false);

  useEffect(() => {
    const fetchLibraryDetails = async () => {
      await axios
        .get(`/api/library/${slug}`)
        .then((res) => {
          setData(res?.data);
          console.log(res?.data);
        })
        .catch((err) => console.log(err));
    };
    fetchLibraryDetails();
  }, [slug]);

  return (
    <div className="min-h-screen relative">
      <h1>{data?.library?.name}</h1>
      <span onClick={() => setAddNewBook(!addNewBook)}>pridaj novu knihu</span>
      <section className="flex my-5 gap-x-10">
        <div
          className={
            "border-2 border-gray-200 bg-gray-500 rounded-2xl px-8 py-5 "
          }
        >
          <h4 className="text-gray-900">Najnovšie pridané knihy</h4>
          {data?.newestBooks?.map((book: any) => (
            <div key={book._id}>{book.title}</div>
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
      <AddNewBook open={addNewBook} />
      as
    </div>
  );
};

export default LibraryDashboard;

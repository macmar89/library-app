import React, { ChangeEvent, useState } from "react";
import { useRecoilValue } from "recoil";
import { LibraryAtom } from "../../global/recoil/LibraryAtom";
import axios from "axios";

//  TODO - validation, error messages/tooltip component

const AddNewBook = () => {
  const library = useRecoilValue<any>(LibraryAtom);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    desc: "",
    yearOfRelease: "",
  });

  const [addedBook, setAddedBook] = useState<boolean>(false)

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const book = {
      title: newBook.title,
      author: newBook.author,
      desc: newBook.desc,
      yearOfRelease: Number(newBook.yearOfRelease),
      libraryId: library?.library._id,
    };

    await axios
      .post("/api/book", book)
      .then(() => {
        setAddedBook(true)

        //  TODO - RESET INPUTS AFTER SUCCESSFULL REQUEST

        // setNewBook({
        //   title: "",
        //   author: "",
        //   desc: "",
        //   yearOfRelease: "",
        // })
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAddedBook(false)
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h2 className="text-center my-5">Pridaj knihu</h2>
        <form onSubmit={handleSubmit} className="flex flex-col w-2/3 mx-auto">
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Názov knihy"
          />
          <input
            type="text"
            name="author"
            onChange={handleChange}
            placeholder="Autor knihy"
          />
          <input
            type="text"
            name="yearOfRelease"
            onChange={handleChange}
            placeholder="Rok vydania..."
          />
          <textarea
            name="desc"
            id=""
            cols={50}
            rows={10}
            onChange={handleChange}
            placeholder="Pridajte popis knihy..."
          />
          <div className="flex justify-end mr-2">
            <button className='btn-primary'>Pridaj do knižnice</button>
          </div>
        </form>
        {addedBook && <div>Kniha bola úspešne pridaná do knižnice</div>}
    </div>
  );
};

export default AddNewBook;

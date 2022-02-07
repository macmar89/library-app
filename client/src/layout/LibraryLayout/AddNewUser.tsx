import React, { ChangeEvent, useState } from "react";
import { useRecoilValue } from "recoil";
import { LibraryAtom } from "../../global/recoil/LibraryAtom";
import axios from "axios";

const AddNewUser = () => {
  const library = useRecoilValue<any>(LibraryAtom);

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      libraryId: library?.library._id,
    };

    await axios
      .post("http://localhost:4000/api/user", user)
      .then(() => {})
      .catch((err) => console.log(err));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h4 className="text-center py-5">Pridaj nového užívateľa</h4>
      <form onSubmit={handleSubmit} className="flex flex-col w-2/3 mx-auto">
        <input
          type="text"
          name="firstName"
          onChange={handleChange}
          placeholder="Krstné meno"
        />
        <input
          type="text"
          name="lastName"
          onChange={handleChange}
          placeholder="Priezvisko"
        />
        <input
          type="text"
          name="email"
          onChange={handleChange}
          placeholder="Email"
        />
        <div className="flex justify-end mr-2">
          <button className="">Pridaj užívateľa</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewUser;

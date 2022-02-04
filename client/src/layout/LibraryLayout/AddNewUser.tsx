import React, {ChangeEvent, SetStateAction, useState} from "react";
import { useRecoilValue } from "recoil";
import { LibraryAtom } from "../../global/recoil/LibraryAtom";
import axios from "axios";

const AddNewUser = ({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<SetStateAction<boolean>> }) => {
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



    await axios.post('http://localhost:4000/api/user',user).then(() => setOpen(false)).catch(err => console.log(err))
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  return (
    <div
      className={`absolute w-96 right-0 top-0 h-screen bg-gray-500 ${
        open ? "translate-x-0" : "translate-x-full"
      } transition`}
    >
      <h4 className="text-center py-5">Pridaj nového užívateľa</h4>
      {/*{library?.library?._id}*/}
      <form onSubmit={handleSubmit} className="flex flex-col">
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
        <button>Pridaj</button>
      </form>
    </div>
  );
};

export default AddNewUser;

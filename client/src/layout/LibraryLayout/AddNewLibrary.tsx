import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";

const AddNewLibrary = () => {
  const history = useHistory();
  const [newLibrary, setNewLibrary] = useState({
    name: "",
    street: "",
    city: "",
    postalCode: "",
    state: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const library = {
      name: newLibrary.name.trim(),
      address: {
        street: newLibrary.street.trim(),
        city: newLibrary.city.trim(),
        postalCode: newLibrary.postalCode,
        state: newLibrary.state.trim(),
      },
      contact: {
        email: newLibrary.email,
        phone: newLibrary.phone,
      },
    };

    await axios
      .post("/api/library", library)
      .then((res) => {
        return res.data?.library?.slug;
      })
      .then((slug) => history.push("/kniznica/" + slug));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewLibrary((val) => ({ ...val, [e.target.name]: e.target.value }));
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col relative">
      <h1>Pridaj novú knižnicu</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          name="name"
          placeholder="Meno knižnice"
          onChange={handleChange}
          value={newLibrary.name}
        />
        <input
          type="text"
          name="street"
          placeholder="Ulica"
          onChange={handleChange}
          value={newLibrary.street}
        />
        <input
          type="text"
          name="city"
          placeholder="Mesto"
          onChange={handleChange}
          value={newLibrary.city}
        />
        <input
          type="text"
          name="postalCode"
          placeholder="PSČ"
          onChange={handleChange}
          value={newLibrary.postalCode}
        />
        <input
          type="text"
          name="state"
          placeholder="Štát"
          onChange={handleChange}
          value={newLibrary.state}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={newLibrary.email}
        />
        <input
          type="text"
          name="phone"
          placeholder="Telefón"
          onChange={handleChange}
          value={newLibrary.phone}
        />

        <button>Pridaj knižnicu</button>
      </form>
    </div>
  );
};

export default AddNewLibrary;

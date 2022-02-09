import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LibraryType } from "../../global/types/LibraryTypes";

export const LibraryForm = ({
  title,
  library,
}: {
  title: string;
  library?: LibraryType;
}) => {
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

  useEffect(() => {
    if (!library) return;
    const lib = {
      name: library.name,
      street: library.address.street,
      city: library.address.city,
      postalCode: library.address.postalCode,
      state: library.address.state,
      email: library.contact.email,
      phone: library.contact.phone,
    };
    setNewLibrary(lib);
  }, [library]);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const libraryData = {
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

    if (library) {
      await axios
        .put("/api/library/" + library?._id, libraryData)
        .then((res) => {
          return res.data?.library?.slug;
        })
        .then((slug) => history.push("/kniznica/" + slug));
    } else {
      await axios
        .post("/api/library", libraryData)
        .then((res) => {
          return res.data?.library?.slug;
        })
        .then((slug) => history.push("/kniznica/" + slug));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewLibrary((val) => ({ ...val, [e.target.name]: e.target.value }));
  };

  return (
    <div className="border p-10 shadow-xl rounded-xl">
      <h1>{title}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-96">
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
        <div className="flex gap-x-2">
          <input
            type="text"
            name="postalCode"
            placeholder="PSČ"
            onChange={handleChange}
            value={newLibrary.postalCode}
            className="w-1/3"
          />
          <input
            type="text"
            name="city"
            placeholder="Mesto"
            onChange={handleChange}
            value={newLibrary.city}
            className="w-2/3"
          />
        </div>
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

        <button className="btn-primary mt-2">Pridaj knižnicu</button>
      </form>
    </div>
  );
};

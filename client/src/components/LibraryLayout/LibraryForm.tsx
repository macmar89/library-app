import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LibraryType } from "../../global/types/LibraryTypes";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewLibrary((val) => ({ ...val, [e.target.name]: e.target.value }));
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Toto pole je povinné"),
    street: Yup.string().required("Toto pole je povinné"),
    postalCode: Yup.string().required("Toto pole je povinné"),
    city: Yup.string().required("Toto pole je povinné"),
    state: Yup.string().required("Toto pole je povinné"),
    email: Yup.string()
      .required("Toto pole je povinné")
      .email("Email je neplatný"),
    phone: Yup.string().required("Toto pole je povinné"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = async (data: any) => {
    console.log(newLibrary)
    const libraryData = {
      name: data.name.trim(),
      address: {
        street: data.street.trim(),
        city: data.city.trim(),
        postalCode: data.postalCode,
        state: data.state.trim(),
      },
      contact: {
        email: data.email,
        phone: data.phone,
      },
    };

    if (library) {
      await axios
        .put("/api/library/" + library?._id, libraryData)
        .then((res) => {
          reset();
          return res.data?.library?.slug;
        })
        .then((slug) => history.push("/kniznica/" + slug));
    } else {
      await axios
        .post("/api/library", libraryData)
        .then((res) => {
          reset();
          return res.data?.library?.slug;
        })
        .then((slug) => history.push("/kniznica/" + slug));
    }

    return false;
  };

  return (
    <div className="flex flex-col items-center border p-10 shadow-xl rounded-xl">
      <h1>{title}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  w-96">
        <div className="form-group">
          <input
            type="text"
            {...register("name")}
            onChange={handleChange}
            placeholder="Meno knižnice"
            value={newLibrary.name}
          />
          <div className="input-form-error">{errors.name?.message}</div>
        </div>
        <div className="form-group">
          <input
            type="text"
            {...register("street")}
            onChange={handleChange}
            placeholder="Ulica"
            value={newLibrary.street}
          />{" "}
          <div className="input-form-error">{errors.street?.message}</div>
        </div>
        <div className="flex gap-x-2">
          <div className=" w-1/3">
            <input
              type="text"
              {...register("postalCode")}
              onChange={handleChange}
              placeholder="PSČ"
              value={newLibrary.postalCode}
              className="w-full"
            />
            <div className="input-form-error">{errors.postalCode?.message}</div>
          </div>
          <div className=" w-2/3">
            <input
              type="text"
              {...register("city")}
              onChange={handleChange}
              placeholder="Mesto"
              value={newLibrary.city}
              className="w-full"
            />
            <div className="input-form-error">{errors.city?.message}</div>
          </div>
        </div>
        <div className="form-group">
          <input
            type="text"
            {...register("state")}
            onChange={handleChange}
            placeholder="Štát"
            value={newLibrary.state}
          />{" "}
          <div className="input-form-error">{errors.state?.message}</div>
        </div>
        <div className="form-group">
          <input
            type="text"
            {...register("email")}
            onChange={handleChange}
            placeholder="Email"
            value={newLibrary.email}
          />{" "}
          <div className="input-form-error">{errors.email?.message}</div>
        </div>
        <div className="form-group">
          <input
            type="text"
            {...register("phone")}
            onChange={handleChange}
            placeholder="Telefón"
            value={newLibrary.phone}
          />
          <div className="input-form-error">{errors.phone?.message}</div>
        </div>
        <button className="btn-primary mt-2">Pridaj knižnicu</button>
      </form>
    </div>
  );
};

import React from "react";
import { useRecoilValue } from "recoil";
import { LibraryAtom } from "../global/recoil/LibraryAtom";
import axios from "axios";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const AddNewUser = () => {
  const library = useRecoilValue<any>(LibraryAtom);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Toto pole je povinné"),
    lastName: Yup.string().required("Priezvisko je povinné"),
    email: Yup.string().required("Email je povinný").email("Email je neplatný"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = async (data: any) => {
    const user = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      libraryId: library?.library._id,
    };

    await axios
      .post("http://localhost:4000/api/user", user)
      .then(() => reset())
      .catch((err) => console.log(err));
    return false;
  };

  return (
    <div className="container">
      <h4 className="text-center py-5">Pridaj nového užívateľa</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-2/3 mx-auto"
      >
        <div className="flex flex-col mb-2">
          <input
            type="text"
            {...register("firstName")}
            placeholder="Krstné meno"
          />
          <div className="input-form-error">{errors.firstName?.message}</div>
        </div>
        <div className="flex flex-col mb-2">
          <input
            type="text"
            {...register("lastName")}
            placeholder="Priezvisko"
          />
          <div className="input-form-error">{errors.lastName?.message}</div>
        </div>
        <div className="flex flex-col mb-2">
          <input type="text" {...register("email")} placeholder="Email" />
          <div className="input-form-error">{errors.email?.message}</div>
        </div>
        <div className="flex justify-end mt-3">
          <button className="btn-primary">Pridaj užívateľa</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewUser;

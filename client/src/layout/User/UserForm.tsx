import React from "react";
import { useRecoilValue } from "recoil";
import { LibraryAtom } from "../../global/recoil/LibraryAtom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { UserType } from "../../global/types/UserType";
import {Button} from "../../global/components/Button";

interface UserFormProps {
  user?: UserType;
  title?: string;
  className?: string;
}

export const UserForm = ({ user, title, className }: UserFormProps) => {

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
    const userData = {
      firstName: data.firstName ,
      lastName: data.lastName,
      email: data.email,
      libraryId: library?.library._id,
    };

    await axios
      .post("http://localhost:4000/api/user", userData)
      .then(() => reset())
      .catch((err) => console.log(err));
    return false;
  };

  return (
    <div className={`form-box ${className}`}>
      {title && <h2 className="text-center py-5">{title}</h2>}
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
        <Button label='Potvrdiť' />
      </form>
    </div>
  );
};

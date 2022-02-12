import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { LibraryAtom } from "../../global/recoil/LibraryAtom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { UserType } from "../../global/types/UserType";
import { Button } from "../../global/components/Button";
import { UserAtom } from "../../global/recoil/UserAtom";
import { toast } from "react-toastify";
import { useHistory, useRouteMatch } from "react-router-dom";

interface UserFormProps {
  user?: UserType | null;
  title?: string;
  className?: string;
}

export const UserForm = ({ user, title, className }: UserFormProps) => {
  const library = useRecoilValue<any>(LibraryAtom);
  const setUser = useSetRecoilState(UserAtom);
  const history = useHistory();
  const { url } = useRouteMatch();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Toto pole je povinné"),
    lastName: Yup.string().required("Priezvisko je povinné"),
    email: Yup.string().required("Email je povinný").email("Email je neplatný"),
  });

  // get functions to build form with useForm() hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: user || { firstName: "", lastName: "", email: "" },
  });

  const onSubmit = async (data: any) => {
    const userData = {
      ...user,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      libraryId: library?.library._id,
    };

    if (user) {
      await axios
        .put("/api/user/" + user?._id, userData)
        .then((res) => setUser(res?.data?.user))
        .then(() => toast("Študent bol upravený"))
        .then(() => history.push(`${url.slice(0, url.lastIndexOf("/"))}`))
        .catch(() => toast("Niečo sa pokazilo. Užívateľ nebol upravený"));
    }

    if (!user) {
      await axios
        .post("http://localhost:4000/api/user", userData)
        .then(() => reset())
        .then(() => toast("Študent bol pridaný"))
        .catch((err) => {
          console.log(err);
          toast("Niečo sa pokazilo. Študent nebol vytvorený");
        });
    }
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
        <Button label="Potvrdiť" />
      </form>
    </div>
  );
};

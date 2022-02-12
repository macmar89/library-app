import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import * as Yup from "yup";

import { LibraryAtom } from "../../global/recoil/LibraryAtom";
import {Button} from "../../global/components/Button";

interface IBookCreateUpdateFormProps {
  className?: string
  title: string
  toastMessage: string
}

export const BookCreateUpdateForm = ({className, title, toastMessage} : IBookCreateUpdateFormProps) => {
  const library = useRecoilValue<any>(LibraryAtom);


  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Toto pole je povinné"),
    author: Yup.string().required("Toto pole je povinné"),
    yearOfRelease: Yup.string().required("Toto pole je povinné"),
    desc: Yup.string().required("Toto pole je povinné"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = async (data: any) => {
    const book = {
      title: data.title,
      author: data.author,
      desc: data.desc,
      yearOfRelease: data.yearOfRelease,
      libraryId: library?.library._id,
    };

    await axios
      .post("/api/book", book)
      .then(() => {
        toast(toastMessage);
      })
      .then(() => {
        reset();
      })
      .catch(() => toast("Niečo sa pokazilo :("));
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
          <input type="text" {...register("title")} placeholder="Názov knihy" />
          <div className="input-form-error">{errors.title?.message}</div>
        </div>
        <div className="flex flex-col mb-2">
          <input
            type="text"
            {...register("author")}
            placeholder="Autor knihy"
          />
          <div className="input-form-error">{errors.author?.message}</div>
        </div>
        <div className="flex flex-col mb-2">
          <input
            type="text"
            {...register("yearOfRelease")}
            placeholder="Rok vydania"
          />
          <div className="input-form-error">
            {errors.yearOfRelease?.message}
          </div>
        </div>
        <div className="flex flex-col mb-2">
          <textarea
            cols={50}
            rows={10}
            {...register("desc")}
            placeholder="Pridajte popis knihy..."
          />

          <div className="input-form-error">
            {errors.desc?.message}
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <Button />
        </div>
      </form>
    </div>
  );
};


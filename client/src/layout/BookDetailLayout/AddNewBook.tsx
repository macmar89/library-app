import React from "react";
import { useRecoilValue } from "recoil";
import { LibraryAtom } from "../../global/recoil/LibraryAtom";
import axios from "axios";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

//  TODO - validation, error messages/tooltip component

const AddNewBook = () => {
  const library = useRecoilValue<any>(LibraryAtom);

  console.log(library);

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
        toast("Kniha úspešne pridaná");
      })
      .then(() => {
        reset();
      })
      .catch(() => toast("Niečo sa pokazilo :("));
    return false;
  };

  return (
    <div className="container">
      <h2 className="text-center my-5">Pridaj knihu</h2>
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
            placeholder="Autor knihy"
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
            {errors.yearOfRelease?.message}
          </div>
        </div>

        <div className="flex justify-end mr-2">
          <button className="btn-primary">Pridaj do knižnice</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewBook;

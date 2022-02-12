import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import { LibraryType } from "../../global/types/LibraryTypes";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "../../global/components/Button";
import { toast } from "react-toastify";
import slug from "slug";
export const LibraryForm = ({
  title,
  library,
}: {
  title: string;
  library?: LibraryType;
}) => {
  const history = useHistory();

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: library?.name,
      street: library?.address?.street,
      city: library?.address?.city,
      state: library?.address?.state,
      postalCode: library?.address?.postalCode,
      phone: library?.contact?.phone,
      email: library?.contact?.email,
    },
  });

  const onSubmit = async (data: any) => {
    const libraryData = {
      name: data.name.trim(),
      slug: slug(data?.name),
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
        .then((slug) => history.push("/kniznica/" + slug))
        .then(() => toast("Knižnica bola upravená"))
        .catch(() => toast("Niečo sa pokazilo. Knižnica nebola upravená"));
    } else {
      await axios
        .post("/api/library", libraryData)
        .then((res) => {
          reset();
          return res.data?.library?.slug;
        })
        .then((slug) => history.push("/kniznica/" + slug))
        .then(() => toast("Knižnica bola vytvorená"))
        .catch(() => toast("Niečo sa pokazilo. Knižnica nebola vytvorená"));
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
            placeholder="Meno knižnice"
          />
          <div className="input-form-error">{errors.name?.message}</div>
        </div>
        <div className="form-group">
          <input type="text" {...register("street")} placeholder="Ulica" />
          <div className="input-form-error">{errors.street?.message}</div>
        </div>
        <div className="flex gap-x-2">
          <div className=" w-1/3">
            <input
              type="text"
              {...register("postalCode")}
              placeholder="PSČ"
              className="w-full"
            />
            <div className="input-form-error">{errors.postalCode?.message}</div>
          </div>
          <div className=" w-2/3">
            <input
              type="text"
              {...register("city")}
              placeholder="Mesto"
              className="w-full"
            />
            <div className="input-form-error">{errors.city?.message}</div>
          </div>
        </div>
        <div className="form-group">
          <input type="text" {...register("state")} placeholder="Štát" />{" "}
          <div className="input-form-error">{errors.state?.message}</div>
        </div>
        <div className="form-group">
          <input type="text" {...register("email")} placeholder="Email" />{" "}
          <div className="input-form-error">{errors.email?.message}</div>
        </div>
        <div className="form-group">
          <input type="text" {...register("phone")} placeholder="Telefón" />
          <div className="input-form-error">{errors.phone?.message}</div>
        </div>
        <Button className="mt-2" />
      </form>
    </div>
  );
};

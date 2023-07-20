import { useEffect, useState } from "react";
import UseFirestore from "../hooks/useFirestore";
import formValidate from "../utils/formValidate";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";

import Button from "../components/Button";
import Title from "../components/Title";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";

const Home = () => {
  const [copy, setCopy] = useState({ propiedadX: true });
  const { required, patternUrl } = formValidate();

  const { data, error, loading, getData, addData, deleteData, updateData } =
    UseFirestore();

  const [newOriginId, setNewOriginId] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
    setError,
  } = useForm();

  useEffect(() => {
    console.log("getData");
    getData();
  }, []);

  if (loading.getData) return <p>Loading data getData...</p>;
  if (error) return <p>{error}</p>;

  const onSubmit = async ({ url }) => {
    try {
      if (newOriginId) {
        await updateData(newOriginId, url);
        setNewOriginId("");
      } else {
        await addData(url);
      }
      resetField("url");
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message: message });
    }
  };

  const handleClickDelete = async (nanoid) => {
    await deleteData(nanoid);
  };

  const handleClickEdit = (item) => {
    setValue("url", item.origin);
    setNewOriginId(item.nanoid);
  };

  const pathUrl = window.location.href;

  const handleClickCopy = async (nanoid) => {
    await navigator.clipboard.writeText(window.location.href + nanoid);
    console.log("copiado");
    setCopy({ [nanoid]: true });
  };

  return (
    <>
      <Title text="Home" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Ingrese tu url"
          type="text"
          placeholder="https://bluuweb.org"
          {...register("url", {
            required: required,
            pattern: patternUrl,
          })}
          error={errors.url}
        >
          <FormError error={errors.url} />
        </FormInput>

        {newOriginId ? (
          <Button
            type="submit"
            text="Edit url"
            color="yellow"
            loading={loading.updateData}
          />
        ) : (
          <Button
            type="submit"
            text="Add url"
            color="blue"
            loading={loading.addData}
          />
        )}
      </form>

      {data.map((item) => (
        <div
          key={item.nanoid}
          className=" p-6 bg-white border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700 mb-2"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {pathUrl}
            {item.nanoid}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {item.origin}
          </p>

          <div className="flex space-x-2">
            <Button
              type="button"
              text="Delete"
              color="red"
              loading={loading[item.nanoid]}
              onClick={() => handleClickDelete(item.nanoid)}
            />
            <Button
              type="button"
              text="Edit"
              color="yellow"
              onClick={() => handleClickEdit(item)}
            />
            <Button
              type="button"
              text={copy[item.nanoid] ? "copied" : "copy"}
              color="blue"
              onClick={() => handleClickCopy(item.nanoid)}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;

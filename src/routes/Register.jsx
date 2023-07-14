import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import FormError from "../components/FormError";
import formValidate from "../utils/formValidate";
import FormInput from "../components/FormInput";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContext);
  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({ defaultValues: { email: "ha@hotmail.com" } });

  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      setError("firebase", { message: erroresFirebase(error.code) });
    }
  };

  return (
    <>
      <h1>Register</h1>

      <FormError error={errors.firebase} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Ingrese email"
          {...register("email", {
            required: required,
            pattern: patternEmail,
          })}
        ></FormInput>

        <FormError error={errors.email} />

        <FormInput
          type="password"
          placeholder="Ingrese password"
          {...register("password", {
            minLength: minLength,
            validate: validateTrim,
          })}
        ></FormInput>

        <FormError error={errors.password} />

        <FormInput
          type="password"
          placeholder="Ingrese password de nuevo"
          {...register("password2", {
            validate: validateEquals(getValues),
          })}
        ></FormInput>

        <FormError error={errors.password2} />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;

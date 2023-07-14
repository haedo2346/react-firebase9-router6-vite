import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import formValidate from "../utils/formValidate";

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { required, patternEmail, minLength, validateTrim } = formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ defaultValues: { email: "ha@hotmail.com" } });

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      setError("firebase", { message: erroresFirebase(error.code) });
    }
  };

  return (
    <>
      <h1>Login</h1>

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

        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;

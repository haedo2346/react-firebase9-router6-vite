import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContext);

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
      console.log(data.email, data.password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        case "auth/email-already-in-use":
          console.log("Ya esta registrado este usuario");
          setError("email", { message: "usuario ya registrado" });
          break;
        case "auth/invalid-email":
          setError("email", {
            message: "Formato email no válido",
          });
          break;
        default:
          console.log("ocurrio un error en el server");
          break;
      }
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Ingrese email"
          {...register("email", {
            required: {
              value: true,
              message: "Campo obligatorio",
            },
            pattern: {
              value:
                /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
              message: "formato de email incorrecto",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Ingrese password"
          {...register("password", {
            setValueAs: (v) => v.trim(),
            minLength: { value: 6, message: "minimo de 6 caracteres" },
            validate: {
              trim: (v) => {
                if (!v.trim()) {
                  return "No seas 🤡";
                } else {
                  true;
                }
              },
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <input
          type="password"
          placeholder="Ingrese password de nuevo"
          {...register("password2", {
            setValueAs: (v) => v.trim(),
            validate: {
              equal: (v) =>
                v === getValues("password") || "No coinciden las contraseñas",
            },
          })}
        />
        {errors.password2 && <p>{errors.password2.message}</p>}
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;

const formValidate = (getValues) => {
  return{
    required: {
        value: true,
        message: "Campo obligatorio",
      },
      patternEmail: {
        value:
          /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
        message: "formato de email incorrecto",
      },
      minLength: { value: 6, message: "minimo de 6 caracteres" },
      
      validateTrim:{
        trim: (v) => {
          if (!v.trim()) {
            return "No seas 🤡";
          } else {
            true;
          }
        },
      },
      validateEquals(getValues) {
        return{
            equal: (v) =>
              v === getValues("password") || "No coinciden las contraseñas"
        }
      },
      
  }
}

export default formValidate
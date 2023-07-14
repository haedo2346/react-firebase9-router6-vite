export const erroresFirebase = (code) => {
    switch (code) {
        case "auth/email-already-in-use":          
          return "Ya esta registrado este usuario"
        case "auth/invalid-email":
            return "Formato email no válido"
        case "auth/user-not-found":
            return "Usuario no registrado"
        case "auth/wrong-password":
          return "Contraseña no registrada"
          
        default:
          console.log("ocurrio un error en el server");
          }
}
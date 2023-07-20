import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Navbar from "./components/Navbar";
import LayoutRequireAuth from "./components/Layouts/LayoutRequireAuth";
import Register from "./routes/Register";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";
import LayoutContainerForm from "./components/Layouts/LayoutContainerForm";
import Perfil from "./routes/Perfil";
import NotFound from "./routes/NotFound";
import LayoutRedirect from "./components/Layouts/LayoutRedirect";

function App() {
  const { user } = useContext(UserContext);

  if (user === false) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<LayoutRequireAuth />}>
          <Route index element={<Home />}></Route>
          <Route path="perfil" element={<Perfil />}></Route>
        </Route>

        <Route path="/" element={<LayoutContainerForm />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}></Route>
        </Route>

        <Route path="/:nanoid" element={<LayoutRedirect />}>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

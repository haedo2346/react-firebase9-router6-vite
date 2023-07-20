import { Outlet, useParams } from "react-router-dom";
import UseFirestore from "../../hooks/useFirestore";
import { useEffect, useState } from "react";
import Title from "../Title";

const LayoutRedirect = () => {
  const { nanoid } = useParams();
  const { searchData } = UseFirestore();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    searchData(nanoid).then((docSnap) => {
      if (docSnap.exists()) {
        window.location.href = docSnap.data().origin;
      } else {
        setloading(false);
      }
    });
  }, []);

  if (loading) return <Title text="cargando redireccionamiento..." />;

  return (
    <div className="mx-auto container">
      <Outlet />
    </div>
  );
};

export default LayoutRedirect;

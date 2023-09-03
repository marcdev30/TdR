import { useState } from "react";
import QuadriculaCategories from "../components/menu/QuadriculaCategories";
import QuadriculaProductes from "../components/menu/QuadriculaProductes";

const PaginaMenu = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [categoriaData, setCategoriaData] = useState([]);

  return (
    <>
      {!categoriaSeleccionada ? (
        <QuadriculaCategories
          setCategoriaSeleccionada={setCategoriaSeleccionada}
          categoriaData={categoriaData}
          setCategoriaData={setCategoriaData}
        />
      ) : (
        <QuadriculaProductes
          categoriaSeleccionada={categoriaSeleccionada}
          categoriaData={categoriaData}
        />
      )}
    </>
  );
};

export default PaginaMenu;

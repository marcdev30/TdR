import { useState } from "react";
import QuadriculaCategories from "../components/menu/QuadriculaCategories";
import QuadriculaProductes from "../components/menu/QuadriculaProductes";

const PaginaMenu = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  return (
    <>
      {!categoriaSeleccionada ? (
        <QuadriculaCategories
          setCategoriaSeleccionada={setCategoriaSeleccionada}
        />
      ) : (
        <QuadriculaProductes />
      )}
    </>
  );
};

export default PaginaMenu;

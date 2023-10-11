import { useEffect } from "react";
import Categoria from "./Categoria";

const QuadriculaCategories = ({
  setCategoriaSeleccionada,
  categoriaData,
  setCategoriaData,
}) => {
  useEffect(() => {
    async function getData() {
      const url = `/api/categories`;
      const response = await fetch(url);

      const data = await response.json();
      setCategoriaData(
        data.map((categoria) => {
          categoria.imatge =
            process.env.REACT_APP_SERVER_URL +
            "/imatge-categoria/" +
            categoria._id +
            "/" +
            categoria.imatge;
          categoria.productes = categoria.productes.map((producte) => {
            producte.imatge =
              process.env.REACT_APP_SERVER_URL +
              "/imatge-producte/" +
              producte._id +
              "/" +
              producte.imatge;

            return producte;
          });
          return categoria;
        })
      );
    }
    getData();
  }, [setCategoriaData]);

  return (
    <div className="quadricula">
      {categoriaData.map((categoria, index) => (
        <Categoria
          setCategoriaSeleccionada={setCategoriaSeleccionada}
          key={index}
          index={index}
          imatge={categoria.imatge}
          nom={categoria.nom}
        />
      ))}
    </div>
  );
};

export default QuadriculaCategories;

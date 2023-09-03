import { useEffect } from "react";
import Categoria from "./Categoria";

const QuadriculaCategories = ({
  setCategoriaSeleccionada,
  categoriaData,
  setCategoriaData,
}) => {
  useEffect(() => {
    async function getData() {
      const url = `http://localhost:8080/api/categories`;
      const response = await fetch(url);
      const data = await response.json();
      setCategoriaData(data);
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
          imatge={
            "https://europastry.com/es/wp-content/uploads/sites/5/2021/05/3330_r1_6.jpeg"
          }
          nom={categoria.nom}
        />
      ))}
    </div>
  );
};

export default QuadriculaCategories;

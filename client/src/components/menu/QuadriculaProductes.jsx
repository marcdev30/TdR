import Producte from "./Producte";

const QuadriculaProductes = ({ categoriaSeleccionada, categoriaData }) => {
  return (
    <div className="quadricula">
      {categoriaData[categoriaSeleccionada - 1].productes.map(
        (producte, index) => (
          <Producte key={index} imatge={producte.imatge} producte={producte} />
        )
      )}
    </div>
  );
};

export default QuadriculaProductes;

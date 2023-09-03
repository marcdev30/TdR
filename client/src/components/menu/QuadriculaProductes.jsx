import Producte from "./Producte";

const QuadriculaProductes = ({ categoriaSeleccionada, categoriaData }) => {
  return (
    <div className="quadricula">
      {categoriaData[categoriaSeleccionada - 1].productes.map(
        (producte, index) => (
          <Producte
            key={index}
            imatge={
              "https://europastry.com/es/wp-content/uploads/sites/5/2021/05/3330_r1_6.jpeg"
            }
            producte={producte}
          />
        )
      )}
    </div>
  );
};

export default QuadriculaProductes;

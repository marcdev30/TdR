import Categoria from "./Categoria";

const QuadriculaCategories = ({ setCategoriaSeleccionada }) => {
  return (
    <div className="quadricula">
      {[...Array(6)].map((categoria) => (
        <Categoria
          setCategoriaSeleccionada={setCategoriaSeleccionada}
          imatge={
            "https://europastry.com/es/wp-content/uploads/sites/5/2021/05/3330_r1_6.jpeg"
          }
          nom={"Entrepans"}
        />
      ))}
    </div>
  );
};

export default QuadriculaCategories;

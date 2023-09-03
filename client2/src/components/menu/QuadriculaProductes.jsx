import Producte from "./Producte";

const QuadriculaProductes = () => {
  return (
    <div className="quadricula">
      {[...Array(6)].map((categoria) => (
        <Producte
          imatge={
            "https://europastry.com/es/wp-content/uploads/sites/5/2021/05/3330_r1_6.jpeg"
          }
          nom={"Entrepà"}
        />
      ))}
    </div>
  );
};

export default QuadriculaProductes;

import { Link } from "react-router-dom";

const Producte = ({ imatge, producte }) => {
  return (
    <Link
      to={`/producte/${producte._id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className="categoria">
        <img src={imatge} alt="Imatge de la categoria" />
        <hr />
        <p className="categoria-nom">{producte.nom}</p>
      </div>
    </Link>
  );
};

export default Producte;

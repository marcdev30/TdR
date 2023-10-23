import { Link } from "react-router-dom";

const Producte = ({ imatge, producte }) => {
	return (
		<Link
			to={`/producte/${producte._id}`}
			style={{ textDecoration: "none", color: "black" }}
		>
			<div className={`categoria ${producte.fons ? "categoria-fons" : ""} producte`}>
				<img src={imatge} alt="Imatge de la categoria" />
				<hr />
				<p className="categoria-nom">{producte.nom}</p>
				<div className="preu">{producte.preu.toFixed(2)} €</div>
			</div>
		</Link>
	);
};

export default Producte;

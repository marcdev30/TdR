import { useEffect, useState } from "react";
import Comanda from "../components/usuari/Comanda";
import "../styles/comandes.css";
import axios from "axios";

const PaginaProducte = () => {
	const [comandes, setComandes] = useState([]);

	useEffect(() => {
		const getData = async () => {
			setComandes((await axios.get(process.env.REACT_APP_API_URL + "/comandes")).data);
			console.log((await axios.get(process.env.REACT_APP_API_URL + "/comandes")).data);
		};
		getData();
	}, []);

	return (
		<div className="pagina-comandes">
			{comandes.map((comanda, index) => (
				<>
					<Comanda
						key={index}
						producte={comanda.producte.nom}
						preu={comanda.producte.preu}
						imatge={
							process.env.REACT_APP_API_URL +
							"/imatge-producte/" +
							comanda.producte._id +
							"/" +
							comanda.producte.imatge
						}
						descripcio={comanda.producte.descripcio}
						data={comanda.creada}
						entregat={comanda.estat === "entregada"}
					/>
				</>
			))}
		</div>
	);
};

export default PaginaProducte;

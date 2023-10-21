import { useState } from "react";

const Comanda = ({ producte, preu, descripcio, imatge, data, entregat }) => {
	const [mouseSobre, setMouseSobre] = useState(false);

	return (
		<div
			className={`comanda ${mouseSobre && !entregat ? "comanda-transition" : ""}`}
			onMouseEnter={() => setMouseSobre(true)}
			onMouseLeave={() => setMouseSobre(false)}
		>
			<div
				className="comanda-contingut"
				style={entregat ? { opacity: "0.6" } : { opacity: "1" }}
			>
				{mouseSobre && !entregat ? (
					<div className="codi-info">
						<h5>
							Demana el teu producte a les 11:00 hores a la cafeteria del centre
							amb el codi:
						</h5>
						<h4>8888</h4>
					</div>
				) : (
					<>
						<img src={imatge} alt="Imatge del producte" />
						<div className="producte-info">
							<h4>{producte}</h4>
							<p>{descripcio}</p>
						</div>
						<h5>{preu.toFixed(2)} €</h5>
						<p>{`${new Date(data).toLocaleDateString("ca-ES")} - ${new Date(
							data
						).toLocaleTimeString("ca-ES", {
							hour: "2-digit",
							minute: "2-digit",
						})}`}</p>
					</>
				)}
			</div>

			<hr />
		</div>
	);
};

export default Comanda;

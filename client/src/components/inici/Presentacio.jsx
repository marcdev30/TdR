import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Presentacio = () => {
	const [temps, setTemps] = useState({ obert: false, hores: 5, minuts: 5, segons: 5 });
	const getData = () => {
		axios.get(process.env.REACT_APP_API_URL + "/temps").then(response => {
			setTemps(response.data);
		});
	};
	useEffect(() => {
		getData();
		const timer = setInterval(() => {
			getData();
		}, 60000);
		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setTemps(prevTemps => {
				let newTemps = { ...prevTemps };
				if (newTemps.segons > 0) {
					newTemps.segons -= 1;
				} else if (newTemps.minuts > 0) {
					newTemps.segons = 59;
					newTemps.minuts -= 1;
				} else if (newTemps.hores > 0) {
					newTemps.segons = 59;
					newTemps.minuts = 59;
					newTemps.hores -= 1;
				} else {
					getData();
				}
				return newTemps;
			});
		}, 1000);
		return () => clearInterval(interval);
	}, [temps]);

	return (
		<div className="presentacio">
			<Container>
				<Row>
					<Col md={6} className="presentacio-contingut">
						<h1>Cafeteria Serrallarga</h1>
						<p>Evita les cues i reserva ara la teva comanda.</p>
						<div>
							<Button href="/menu" variant="light">
								Veure el menú
							</Button>
							{/* <Button href="/inici-sessio" variant="outline-light">
								Iniciar sessió
							</Button> */}
						</div>
					</Col>
					<Col md={6} className="presentacio-comptaenrere">
						<div className="comptaenrere">
							<h4>
								Sistema de reserves:{" "}
								<span
									className={`comptaenrere-estat ${
										temps.obert
											? "comptaenrere-obert"
											: "comptaenrere-tancat"
									}`}
								>
									{temps.obert ? "OBERT" : "TANCAT"}
								</span>
							</h4>
							<p style={{ margin: 0 }} className="comptaenrere-obert-en">
								{temps.obert ? "Tanca en:" : "Obre en:"}
							</p>
							<hr />
							<div className="comptaenrere-digits">
								<div className="comptaenrere-digit">
									{((temps.hores < 10 ? "0" : "") + temps.hores)[0]}
								</div>
								<div className="comptaenrere-digit">
									{((temps.hores < 10 ? "0" : "") + temps.hores)[1]}
								</div>
								<div className="digit-separador">h</div>
								<div className="comptaenrere-digit">
									{((temps.minuts < 10 ? "0" : "") + temps.minuts)[0]}
								</div>
								<div className="comptaenrere-digit">
									{((temps.minuts < 10 ? "0" : "") + temps.minuts)[1]}
								</div>
								<div className="digit-separador">m</div>
								<div className="comptaenrere-digit">
									{((temps.segons < 10 ? "0" : "") + temps.segons)[0]}
								</div>
								<div className="comptaenrere-digit">
									{((temps.segons < 10 ? "0" : "") + temps.segons)[1]}
								</div>
								<div>s</div>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Presentacio;

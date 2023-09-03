import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Presentacio = () => (
	<div className="presentacio">
		<Container>
			<Row>
				<Col md={6} className="presentacio-contingut">
					<h1>Cafeteria Serrallarga</h1>
					<p>Evita les cues i reserva ara la teva comanda.</p>
					<div>
						<Button href="/menu" variant="dark">
							Veure el menú
						</Button>
						<Button variant="outline-light">Iniciar sessió</Button>
					</div>
				</Col>
				<Col md={6} className="presentacio-comptaenrere">
					<div className="comptaenrere">
						<h4>
							Sistema de reserves:{" "}
							<span className="comptaenrere-estat">OBERT</span>
						</h4>
						<hr />
						<div className="comptaenrere-digits">
							<div className="comptaenrere-digit">0</div>
							<div className="comptaenrere-digit">1</div>:
							<div className="comptaenrere-digit">2</div>
							<div className="comptaenrere-digit">3</div>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	</div>
);

export default Presentacio;

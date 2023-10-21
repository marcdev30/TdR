import { Container, Row, Col } from "react-bootstrap";

const Qualitats = () => {
	return (
		<Container fluid className="qualitats">
			<h3>Qualitats del nostre servei</h3>
			<p>
				El nostre servei t'ofereix diverses qualitats que ens diferencien de les altres
				cafeteries.
			</p>
			<Row className="llista-qualitats">
				<Col className="qualitat">
					<img src="/images/pan.jpeg" alt="Imatge qualitat" />
					<h4>Pa acabat de fer</h4>
					<p>Saboreja el nostre pa acabat de fornejar</p>
				</Col>
				<Col className="qualitat">
					<img src="/images/pan.jpeg" alt="Imatge qualitat" />
					<h4>Pa acabat de fer</h4>
					<p>Saboreja el nostre pa acabat de fornejar</p>
				</Col>
				<Col className="qualitat">
					<img src="/images/pan.jpeg" alt="Imatge qualitat" />
					<h4>Pa acabat de fer</h4>
					<p>Saboreja el nostre pa acabat de fornejar</p>
				</Col>
				<Col className="qualitat">
					<img src="/images/pan.jpeg" alt="Imatge qualitat" />
					<h4>Pa acabat de fer</h4>
					<p>Saboreja el nostre pa acabat de fornejar</p>
				</Col>
			</Row>
		</Container>
	);
};

export default Qualitats;

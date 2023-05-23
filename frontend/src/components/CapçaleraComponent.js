import { Nav } from "react-bootstrap";

const CapçaleraComponent = () => {
	return (
		<Nav className="justify-content-center">
			<Nav.Item>
				<Nav.Link>Inici</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link>Menú</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link>Contacte</Nav.Link>
			</Nav.Item>
		</Nav>
	);
};

export default CapçaleraComponent;

import { Nav } from "react-bootstrap";

const CapçaleraComponent = () => {
	return (
		<Nav className="justify-content-center">
			<Nav.Item>
				<Nav.Link href="/">Inici</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link href="/menu">Menú</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link href="/contacte">Contacte</Nav.Link>
			</Nav.Item>
		</Nav>
	);
};

export default CapçaleraComponent;

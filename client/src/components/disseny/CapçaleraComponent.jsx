import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

const CapçaleraComponent = () => {
	const [userInfo, setUserInfo] = useState();

	useEffect(() => {
		async function getData() {
			axios.get(process.env.REACT_APP_API_URL + "/user").then(response => {
				setUserInfo(response.data);
			});
		}
		getData();
	}, []);

	return (
		<Navbar
			bg="light"
			style={{ position: "sticky", width: "100%", top: "0", zIndex: "5" }}
		>
			<Container>
				<Row className="w-100">
					<Col md={4}>
						<Navbar.Brand href="/">
							<img src="/images/logo.png" width="75px" alt="Logo" />
						</Navbar.Brand>
					</Col>
					<Col md={4} className="d-flex justify-content-center align-items-center">
						<Nav className="gap-5">
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
					</Col>
					<Col md={4} className="d-flex justify-content-end">
						<Nav className="gap-4">
							{userInfo ? (
								<Nav.Link href="/perfil">
									<Button variant="primary" className="me-3 rounded-circle">
										{userInfo.nom[0]}
									</Button>
									<Button variant="outline-success">12.30 €</Button>
								</Nav.Link>
							) : (
								<>
									<Nav.Link href="/inici-sessio">
										<Button variant="secondary">Iniciar sessió</Button>
									</Nav.Link>
									<Nav.Link href="/registre">
										<Button variant="primary">Registrar-se</Button>
									</Nav.Link>
								</>
							)}
						</Nav>
					</Col>
				</Row>
			</Container>
		</Navbar>
	);
};

export default CapçaleraComponent;

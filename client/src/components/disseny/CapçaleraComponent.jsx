import { Button, Col, Container, Dropdown, Nav, Navbar, Row } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import "../../styles/disseny.css";

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
								<Nav.Item>
									<Dropdown className="d-inline mx-2">
										<Dropdown.Toggle
											id="dropdown-autoclose-true"
											className="me-3 rounded-circle"
										>
											{userInfo.nom[0]}
										</Dropdown.Toggle>

										<Dropdown.Menu>
											<Dropdown.Item href="/perfil">
												Perfil
											</Dropdown.Item>
											<Dropdown.Item href="/comandes">
												Comandes
											</Dropdown.Item>
											<Dropdown.Item href="#">
												Tancar la sessió
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
									<Button variant="outline-success">
										{userInfo.saldo.toFixed(2).replace(".", ",")} €
									</Button>
								</Nav.Item>
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

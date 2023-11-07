import { useState } from "react";
import { Row, Col, Container, Button, Form, Breadcrumb } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import DOMPurify from "dompurify";

const PaginaProducte = () => {
	const { producteId } = useParams();
	const [submitted, setSubmitted] = useState(false);
	const navigate = useNavigate();
	const [producte, setProducte] = useState(null);
	const [comentaris, setComentaris] = useState("");
	const [userInfo, setUserInfo] = useState();

	useEffect(() => {
		async function getData() {
			axios.get(process.env.REACT_APP_API_URL + "/user").then(response => {
				setUserInfo(response.data);
			});
		}
		getData();
	}, []);

	useEffect(() => {
		async function getData() {
			setProducte(
				(
					await axios.get(process.env.REACT_APP_API_URL + "/producte", {
						params: { id: producteId },
					})
				).data
			);
		}
		getData();
	}, [setProducte]);

	return (
		<>
			{producte ? (
				<Container style={{ paddingBottom: "100px" }}>
					<Row className="mt-5">
						<Col md={6} className="mt-2">
							<img
								src={
									process.env.REACT_APP_API_URL +
									"/imatge-producte/" +
									producte._id +
									"/" +
									producte.imatge
								}
								alt=""
								className="rounded"
								style={{
									width: "100%",
									maxHeight: "525px",
									objectFit: "contain",
								}}
							/>
						</Col>
						<Col md={6} className="d-flex flex-column gap-4 mt-4 mb-3">
							{/* <Link to="/">Menú &gt; Entrepans &gt; {producte.nom}</Link> */}
							<Breadcrumb>
								<Breadcrumb.Item href="/menu">Menú</Breadcrumb.Item>
								{/* <Breadcrumb.Item href="/menu">Entrepans</Breadcrumb.Item> */}
								<Breadcrumb.Item active>{producte.nom}</Breadcrumb.Item>
							</Breadcrumb>
							<h2>{producte.nom}</h2>
							<h3>{producte.preu.toFixed(2)} €</h3>
							<p
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(producte.descripcio),
								}}
							/>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlTextarea1"
							>
								<Form.Control
									as="textarea"
									rows={3}
									placeholder="Comentaris (opcional)"
									style={{ resize: "none" }}
									value={comentaris}
									onChange={e => setComentaris(e.target.value)}
								/>
							</Form.Group>
							<div className="d-grid mb-5">
								<Button
									variant="success"
									size="lg"
									className="d-flex justify-content-center gap-3 align-items-center mb-5"
									onClick={async () => {
										if (userInfo) {
											setSubmitted(true);
											const codi = (
												await axios.get(
													process.env.REACT_APP_API_URL +
														"/generar-codi-comanda"
												)
											).data;
											axios.post(
												process.env.REACT_APP_API_URL + "/comanda",
												{
													usuari: userInfo._id,
													producte: producteId,
													estat: "pendent",
													comentaris: comentaris,
													codi,
													preu: producte.preu,
												}
											);
											setTimeout(() => navigate("/comandes"), 1400);
										} else {
											navigate("/inici-sessio");
										}
									}}
								>
									{submitted ? "" : userInfo ? "Reservar" : "Iniciar sessió"}
									<div
										className={
											submitted
												? "dummy-positioning d-flex"
												: "dummy-positioning d-none"
										}
									>
										<div className="success-icon">
											<div className="success-icon__tip"></div>
											<div className="success-icon__long"></div>
										</div>
									</div>
								</Button>
							</div>
						</Col>
					</Row>
				</Container>
			) : (
				<></>
			)}
		</>
	);
};

export default PaginaProducte;

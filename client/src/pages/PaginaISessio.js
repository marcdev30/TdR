import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Link } from "react-router-dom";
import "../styles/sesion.css";
import * as formik from "formik";
import * as yup from "yup";
import { useState } from "react";

const PaginaISessio = () => {
	const { Formik } = formik;
	const schema = yup.object().shape({
		username: yup.string().required("Has d'introduir un correu electrònic."),
		password: yup.string().required("Has d'introduir la teva contrasenya."),
	});

	const [submitted, setSubmitted] = useState(false);

	return (
		<div className="i-sessio">
			<img src="/images/fons-registre.svg" className="left" alt="" />
			<div className="login">
				<h2>Iniciar sessió</h2>
				<Formik
					validationSchema={schema}
					onSubmit={fields => {
						window.location.replace("/");
					}}
					initialValues={{ username: "", password: "" }}
				>
					{({ handleSubmit, handleChange, values, touched, errors }) => (
						<Form
							// noValidate
							// onSubmit={handleSubmit}
							action="/inici-sessio"
							method="post"
							className="w-100 d-flex flex-column"
						>
							<Form.Group className="mb-3 mt-4">
								<FloatingLabel label="Email" className="mb-1">
									<Form.Control
										value={values.username}
										name="username"
										onChange={handleChange}
										type="email"
										placeholder=""
										autoComplete="off"
									/>
								</FloatingLabel>
								{errors.username && submitted && touched.username !== 0 ? (
									<div>{errors.username}</div>
								) : null}
							</Form.Group>
							<Form.Group className="mb-2">
								<FloatingLabel label="Contrasenya" className="mb-3">
									<Form.Control
										value={values.password}
										name="password"
										onChange={handleChange}
										type="password"
										placeholder=""
										autoComplete="off"
									/>
								</FloatingLabel>
								{errors.password && submitted && touched.password !== 0 ? (
									<div>{errors.password}</div>
								) : null}
							</Form.Group>
							<Link
								to="/"
								className="align-self-end mb-5 text-decoration-none sesion-enlaces"
							>
								Has oblidat la teva contrasenya?
							</Link>
							<Button onClick={() => setSubmitted(true)} type="submit">
								Iniciar sessió
							</Button>
							<p className="align-self-center text-center mt-4 sesion-enlaces">
								No tens un compte?{" "}
								<Link to="/registre" className="text-decoration-none">
									Registra't
								</Link>
							</p>
						</Form>
					)}
				</Formik>
			</div>
			<img src="/images/fons-registre.svg" className="right" alt="" />
		</div>
	);
};

export default PaginaISessio;

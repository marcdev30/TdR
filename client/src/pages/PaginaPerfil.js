import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const PaginaPerfil = () => {
  const [validated, setValidated] = useState(false);
  const [nouNom, setNouNom] = useState("");

  useEffect(() => {
    async function getData() {
      axios.get(process.env.REACT_APP_SERVER_URL + "/nom").then((response) => {
        setNouNom(response.data.nom);
      });
    }
    getData();
  }, []);

  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const confirm = document.querySelector("input[name=confirmPassword]");
    if (confirm.value === password.value) {
      confirm.setCustomValidity("");
    } else {
      confirm.setCustomValidity("Passwords do not match");
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      axios.post(process.env.REACT_APP_SERVER_URL + "/nom", {
        nouNom,
      });
    }

    setValidated(true);
  };
  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Perfil</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue="Marc"
                name="nom"
                value={nouNom}
                onChange={(e) => setNouNom(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Has d'introduïr el teu nom
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correu</Form.Label>
              <Form.Control disabled value="mcolldeforns@iesserrallarga.cat" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Saldo disponible</Form.Label>
              <Form.Control
                readOnly
                disabled
                type="text"
                placeholder="Enter your street name and house number"
                defaultValue="10.21 €"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contrasenya</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                minLength={6}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid password
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Password should have at least 6 characters
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                name="confirmPassword"
                type="password"
                placeholder="Repeat Password"
                minLength={6}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Both passwords should match
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Actualitzar
            </Button>
            <Alert show={true} variant="danger">
              User with that email already exists!
            </Alert>
            <Alert show={true} variant="info">
              User updated
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PaginaPerfil;

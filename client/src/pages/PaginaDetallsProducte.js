import { useState } from "react";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const PaginaDetallsProducte = () => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  return (
    <Container>
      <Row className="mt-5">
        <Col md={6} className="mt-2">
          <img
            src="https://europastry.com/es/wp-content/uploads/sites/5/2021/05/3330_r1_6.jpeg"
            alt=""
            className="rounded"
            style={{ backgroundColor: "red", width: "100%" }}
          />
        </Col>
        <Col md={6} className="d-flex flex-column gap-4 mt-4">
          <Link to="/">Menú &gt; Entrepans &gt; Entrepà de formatge</Link>
          <h2>Entrepà de formatge</h2>
          <h3>1.20€</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare, eros dolor interdum nulla, ut commodo diam libero
            vitae erat.
          </p>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            {/* <Form.Label>Comentaris</Form.Label> */}
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Comentaris (opcional)"
              style={{ resize: "none" }}
            />
          </Form.Group>
          <div className="d-grid">
            <Button
              variant="success"
              size="lg"
              className="d-flex justify-content-center gap-3 align-items-center"
              onClick={() => {
                setSubmitted(true);
                setTimeout(() => navigate("/"), 1400);
              }}
            >
              {submitted ? "" : "Reservar"}
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
  );
};

export default PaginaDetallsProducte;

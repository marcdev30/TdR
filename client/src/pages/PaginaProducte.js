import { useState } from "react";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const PaginaProducte = () => {
  const { producteId } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [producte, setProducte] = useState(null);

  useEffect(() => {
    async function getData() {
      setProducte(
        (
          await axios.get("http://localhost:8080/api/producte", {
            params: { id: producteId },
          })
        ).data
      );
    }
    getData();
  }, [setProducte]);

  console.log(producte);

  return (
    <>
      {producte ? (
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
              <Link to="/">Menú &gt; Entrepans &gt; {producte.nom}</Link>
              <h2>{producte.nom}</h2>
              <h3>{producte.preu.toFixed(2)}€</h3>
              <p>{producte.descripcio}</p>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
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
                    axios.post("http://localhost:8080/api/comanda", {
                      producte: producteId,
                      estat: "pendent",
                      comentaris: "",
                    });
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
      ) : (
        <></>
      )}
    </>
  );
};

export default PaginaProducte;

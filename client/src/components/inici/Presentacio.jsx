import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Presentacio = () => {
  const [temps, setTemps] = useState({ hores: 5, minuts: 5, segons: 5 });
  const getData = () => {
    axios.get("http://localhost:8080/api/temps").then((response) => {
      setTemps(response.data);
    });
  };
  useEffect(() => {
    getData();
    const timer = setInterval(() => {
      getData();
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTemps((prevTemps) => {
        let newTemps = { ...prevTemps };
        if (newTemps.segons > 0) {
          newTemps.segons -= 1;
        } else if (newTemps.minuts > 0) {
          newTemps.segons = 59;
          newTemps.minuts -= 1;
        } else if (newTemps.hores > 0) {
          newTemps.segons = 59;
          newTemps.minuts = 59;
          newTemps.hores -= 1;
        }
        return newTemps;
      });
      console.log((temps.segons < 10 ? "0" : "") + temps.segons);
      console.log(temps);
    }, 1000);
    return () => clearInterval(interval);
  }, [temps]);

  return (
    <div className="presentacio">
      <Container>
        <Row>
          <Col md={6} className="presentacio-contingut">
            <h1>Cafeteria Serrallarga</h1>
            <p>Evita les cues i reserva ara la teva comanda.</p>
            <div>
              <Button href="/menu" variant="dark">
                Veure el menú
              </Button>
              <Button href="/inici-sessio" variant="outline-light">
                Iniciar sessió
              </Button>
            </div>
          </Col>
          <Col md={6} className="presentacio-comptaenrere">
            <div className="comptaenrere">
              <h4>
                Sistema de reserves:{" "}
                <span className="comptaenrere-estat comptaenrere-tancat">
                  TANCAT
                </span>
              </h4>
              <p
                style={{ margin: 0, marginLeft: "15px" }}
                className="comptaenrere-obert"
              >
                Obre en:
              </p>
              <hr />
              <div className="comptaenrere-digits">
                <div className="comptaenrere-digit">
                  {((temps.hores < 10 ? "0" : "") + temps.hores)[0]}
                </div>
                <div className="comptaenrere-digit">
                  {((temps.hores < 10 ? "0" : "") + temps.hores)[1]}
                </div>
                :
                <div className="comptaenrere-digit">
                  {((temps.minuts < 10 ? "0" : "") + temps.minuts)[0]}
                </div>
                <div className="comptaenrere-digit">
                  {((temps.minuts < 10 ? "0" : "") + temps.minuts)[1]}
                </div>
                :
                <div className="comptaenrere-digit">
                  {((temps.segons < 10 ? "0" : "") + temps.segons)[0]}
                </div>
                <div className="comptaenrere-digit">
                  {((temps.segons < 10 ? "0" : "") + temps.segons)[1]}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Presentacio;

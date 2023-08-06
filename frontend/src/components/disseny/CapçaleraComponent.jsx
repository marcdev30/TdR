import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";

const CapçaleraComponent = () => {
  return (
    <Navbar bg="light">
      <Container>
        <Row className="w-100">
          <Col md={3}>
            <Navbar.Brand href="/">
              <img src="/images/logo.jpg" width="75px" alt="Logo" />
            </Navbar.Brand>
          </Col>
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
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
          <Col md={3} className="d-flex justify-content-end">
            <Nav className="gap-4">
              <Nav.Link>
                <Button variant="secondary">Iniciar sessió</Button>
              </Nav.Link>
              <Nav.Link>
                <Button variant="primary">Registrar-se</Button>
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default CapçaleraComponent;

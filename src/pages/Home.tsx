import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    navigate(`/${role.toLowerCase()}`);
  };

  return (
    <Container className="py-5 text-center">
      <h1 className="mb-4">Appointment Booking System</h1>
      <Row className="justify-content-center g-4">
        {["Student", "Teacher", "Admin"].map((role) => (
          <Col key={role} xs={12} md={4}>
            <Card className="shadow">
              <Card.Body>
                <Card.Title>{role}</Card.Title>
                <Card.Text>Login or Register as a {role}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleRoleSelect(role)}
                >
                  Continue as {role}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;

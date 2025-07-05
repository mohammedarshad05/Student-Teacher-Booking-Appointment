import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { MdLogin, MdAppRegistration, MdAdminPanelSettings, MdSchool } from "react-icons/md";
import "../styles/Navbar.css";

const AppNavbar = () => {
  const location = useLocation();

  return (
    <Navbar expand="lg" className="custom-navbar shadow-sm" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="nav-logo">
          Student Booking Portal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto nav-links">
            <Nav.Link as={Link} to="/login" active={location.pathname === "/login"}>
              <MdLogin className="nav-icon" /> Student Login
            </Nav.Link>
            <Nav.Link as={Link} to="/register" active={location.pathname === "/register"}>
              <MdAppRegistration className="nav-icon" /> Register
            </Nav.Link>
            <Nav.Link as={Link} to="/teacher-login" active={location.pathname === "/teacher-login"}>
              <MdSchool className="nav-icon" /> Teacher Login
            </Nav.Link>
            <Nav.Link as={Link} to="/admin" active={location.pathname === "/admin"}>
              <MdAdminPanelSettings className="nav-icon" /> Admin Panel
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;

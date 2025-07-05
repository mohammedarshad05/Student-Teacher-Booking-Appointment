import { Container, Row, Col } from "react-bootstrap";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaRegCopyright,
} from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-dark">
      <Container>
        <Row className="align-items-center text-center text-md-start">
          <Col md={6} className="mb-3 mb-md-0">
            <div className="footer-left">
              <FaRegCopyright className="footer-icon" />
              <span>
                {new Date().getFullYear()}{" "}
                <strong>Student-Teacher Booking</strong>. All rights reserved.
              </span>
            </div>
          </Col>

          <Col md={6} className="text-md-end">
            <div className="footer-right">
              <span className="footer-designer">
                Designed by <strong>Mohammed Arshad</strong>
              </span>
              <div className="social-icons">
                <a
                  href="https://www.linkedin.com/in/mohammad-arshad-a5202a33b"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://github.com/mohammedarshad05"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.instagram.com/ot.arsh/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

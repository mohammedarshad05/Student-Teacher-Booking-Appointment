import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "../styles/studentregister.css";

const StudentRegister = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "students", userCred.user.uid), {
        email,
        name,
        approved: false,
      });

      alert("Registered successfully! Please login.");
      navigate("/login");
    } catch (err: any) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-container">
        {/* Left - Form */}
        <div className="register-left">
          <div className="register-box">
            <h2 className="register-title">🎓 Student Registration</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button type="submit" className="w-100 register-btn">
                Register
              </Button>
            </Form>

            <p className="register-login-link">
              Already have an account?{" "}
              <Link to="/login" className="text-link">
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Right - Illustration */}
        <div className="register-right">
        <div className="login-illustration-text">
          <h1>Book Appointments with Ease</h1>
          <p>
            Create your student account to connect with teachers and schedule
            sessions easily.
            </p>
        </div>

          <img
            src="/assets/student-portal.svg"
            alt="Register"
            className="register-image"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;

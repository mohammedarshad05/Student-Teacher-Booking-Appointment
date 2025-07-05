import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/teacherlogin.css"; // 👈 Make sure to create this

const TeacherLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("teacherEmail", email);
      navigate("/TeacherDashboard");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="teacher-login-page">
      <div className="teacher-login-box">
        <h2 className="teacher-login-title">👨‍🏫 Teacher Login</h2>
        <p className="teacher-login-sub">Access your dashboard</p>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="teacher-input"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="teacher-input"
            />
          </Form.Group>

          <Button type="submit" className="w-100 teacher-login-btn">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default TeacherLogin;

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/loginform.css"; // 🎨 Advanced styling included

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      const studentRef = doc(db, "students", uid);
      const studentSnap = await getDoc(studentRef);

      if (!studentSnap.exists()) {
        setError("Student record not found.");
        return;
      }

      const student = studentSnap.data();
      if (!student.approved) {
        setError(
          "Your registration is under review. Please wait for admin approval."
        );
        return;
      }

      alert("Login successful!");
      localStorage.setItem("userEmail", email);
      navigate("/StudentDashboard");
    } catch (err: any) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-split-container">
        {/* Left Side - Login Form */}
        <div className="login-left">
          <div className="login-form-box">
            <h2 className="login-heading">Login</h2>
            <p className="login-subheading">Enter your account details</p>

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
                />
              </Form.Group>

              <Button
                type="submit"
                className="w-100 login-btn"
                variant="primary"
              >
                Login
              </Button>

              <div className="signup-prompt d-flex justify-content-center align-items-center mt-4">
                <p className="mb-0 me-2 text-light">Don’t have an account?</p>
                <a className="text-link" href="/register" data-discover="true">
                  SignUp
                </a>
              </div>
            </Form>
          </div>
        </div>

        {/* Right Side - Welcome Illustration */}
        <div className="login-right">
          <div className="login-illustration-text">
            <h1>
              Welcome to the <strong>Appointment Dashboard</strong>
            </h1>
            <p>Login to access your account</p>
          </div>
          <img
            src="/assets/student-portal.svg"
            alt="Student Portal Illustration"
            className="login-illustration large"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { Form, Button, Container, Alert } from "react-bootstrap";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Store additional data in Firestore
      await addDoc(collection(db, "students"), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
      });

      alert("Registration successful!");
      setEmail("");
      setPassword("");
      setError("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: "400px" }}>
      <h2 className="mb-3">Student Registration</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleRegister}>
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

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterForm;

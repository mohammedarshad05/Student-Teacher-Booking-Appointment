import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { Form, Button, Container } from "react-bootstrap";

const BookAppointment = () => {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [message, setMessage] = useState("");
  const [datetime, setDatetime] = useState("");

  // Fetch teachers from Firestore
  useEffect(() => {
    const fetchTeachers = async () => {
      const snapshot = await getDocs(collection(db, "teachers"));
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTeachers(list);
    };
    fetchTeachers();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeacher || !datetime || !message) {
      alert("Please fill all fields");
      return;
    }

    await addDoc(collection(db, "appointments"), {
      teacherId: selectedTeacher,
      studentEmail: localStorage.getItem("userEmail") || "unknown",
      message,
      datetime,
      status: "pending",
    });

    alert("Appointment request sent!");
    setSelectedTeacher("");
    setMessage("");
    setDatetime("");
  };

  return (
    <Container className="mt-4">
      <h3>📚 Book Appointment</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Select Teacher</Form.Label>
          <Form.Select
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            required
          >
            <option value="">-- Choose a Teacher --</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name} ({teacher.subject})
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Mention your reason for booking"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date & Time</Form.Label>
          <Form.Control
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Book Appointment
        </Button>
      </Form>
    </Container>
  );
};

export default BookAppointment;

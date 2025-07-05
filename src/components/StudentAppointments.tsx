import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Card, Container, Spinner } from "react-bootstrap";

const StudentAppointments = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const studentEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!studentEmail) return;
      const q = query(
        collection(db, "appointments"),
        where("studentEmail", "==", studentEmail)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAppointments(data);
      setLoading(false);
    };

    fetchAppointments();
  }, [studentEmail]);

  return (
    <Container className="mt-4">
      <h4>📋 Your Appointments</h4>
      {loading ? (
        <Spinner animation="border" />
      ) : appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((apt) => (
          <Card key={apt.id} className="mb-3">
            <Card.Body>
              <Card.Title>🧑‍🏫 Teacher ID: {apt.teacherId}</Card.Title>
              <Card.Text>
                <strong>Message:</strong> {apt.message}
              </Card.Text>
              <Card.Text>
                <strong>Scheduled for:</strong> {apt.datetime}
              </Card.Text>
              <Card.Text>
                <strong>Status:</strong> {apt.status}
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default StudentAppointments;

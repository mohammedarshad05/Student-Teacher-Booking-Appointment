import { useEffect, useState } from "react";
import { db, auth } from "../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { Button, Card, Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const TeacherDashboard = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const teacherEmail = localStorage.getItem("teacherEmail");

  const fetchAppointments = async () => {
    if (!teacherEmail) return;
    const q = query(
      collection(db, "appointments"),
      where("teacherEmail", "==", teacherEmail)
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setAppointments(data);
    setLoading(false);
  };

  const handleAction = async (id: string, status: string) => {
    const docRef = doc(db, "appointments", id);
    await updateDoc(docRef, { status });
    fetchAppointments(); // refresh the list
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("teacherEmail");
    navigate("/teacher-login");
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>👨‍🏫 Welcome, Teacher</h2>
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {loading ? (
        <Spinner animation="border" />
      ) : appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((apt) => (
          <Card key={apt.id} className="mb-3">
            <Card.Body>
              <Card.Title>📅 Appointment Request</Card.Title>
              <Card.Text>
                <strong>Student:</strong> {apt.studentEmail}
              </Card.Text>
              <Card.Text>
                <strong>Message:</strong> {apt.message}
              </Card.Text>
              <Card.Text>
                <strong>Requested time:</strong> {apt.datetime}
              </Card.Text>
              <Card.Text>
                <strong>Status:</strong> {apt.status}
              </Card.Text>
              <div className="d-flex gap-2">
                <Button
                  variant="success"
                  onClick={() => handleAction(apt.id, "Approved")}
                >
                  Approve
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleAction(apt.id, "Cancelled")}
                >
                  Cancel
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default TeacherDashboard;

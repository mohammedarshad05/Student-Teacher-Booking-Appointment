import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import BookAppointment from "../components/BookAppointment";
import StudentAppointments from "../components/StudentAppointments";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out successfully!");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2>🎓 Welcome, Student!</h2>
          <p>
            Here you can book appointments with teachers and view your bookings.
          </p>
        </div>
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* Appointment booking section */}
      <BookAppointment />

      {/* View booked appointments */}
      <StudentAppointments />
    </Container>
  );
};

export default StudentDashboard;

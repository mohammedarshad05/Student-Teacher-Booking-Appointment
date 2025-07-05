import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Spinner } from "react-bootstrap";
import "../styles/teacherappointments.css";

const TeacherAppointments = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const teacherEmail = localStorage.getItem("teacherEmail");

  useEffect(() => {
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

    fetchAppointments();
  }, [teacherEmail]);

  return (
    <div className="teacher-appointments-page">
      <div className="teacher-appointments-container">
        <h2 className="section-heading">📅 Your Scheduled Appointments</h2>
        {loading ? (
          <div className="loading-spinner">
            <Spinner animation="border" />
          </div>
        ) : appointments.length === 0 ? (
          <p className="empty-message">No appointments yet.</p>
        ) : (
          appointments.map((apt) => (
            <div key={apt.id} className="appointment-card">
              <h5>👨‍🎓 Student: {apt.studentEmail}</h5>
              <p>
                <strong>Message:</strong> {apt.message}
              </p>
              <p>
                <strong>Date & Time:</strong> {apt.datetime}
              </p>
              <p>
                <strong>Status:</strong> {apt.status}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeacherAppointments;

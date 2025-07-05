import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Form, Button, Card } from "react-bootstrap";
import "../styles/admindashboard.css";

const AdminDashboard = () => {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    subject: "",
    email: "",
  });

  const fetchTeachers = async () => {
    const snapshot = await getDocs(collection(db, "teachers"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTeachers(data);
  };

  const fetchStudents = async () => {
    const snapshot = await getDocs(collection(db, "students"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setStudents(data);
  };

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, "teachers"), formData);
    setFormData({ name: "", department: "", subject: "", email: "" });
    fetchTeachers();
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "teachers", id));
    fetchTeachers();
  };

  const handleApprove = async (id: string) => {
    const docRef = doc(db, "students", id);
    await updateDoc(docRef, { approved: true });
    fetchStudents();
  };

  useEffect(() => {
    fetchTeachers();
    fetchStudents();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-heading">👩‍💼 Admin Dashboard</h2>

      {/* Add Teacher */}
      <div className="admin-section">
        <h4>Add New Teacher</h4>
        <Form onSubmit={handleAddTeacher}>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              placeholder="Department"
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </Form.Group>
          <Button type="submit" variant="dark" className="w-100">
            Add Teacher
          </Button>
        </Form>
      </div>

      {/* All Teachers */}
      <div className="admin-section">
        <h4>All Teachers</h4>
        {teachers.map((teacher) => (
          <Card key={teacher.id} className="mb-3 admin-card">
            <Card.Body>
              <Card.Title>{teacher.name}</Card.Title>
              <Card.Text>
                <strong>Dept:</strong> {teacher.department} <br />
                <strong>Subject:</strong> {teacher.subject} <br />
                <strong>Email:</strong> {teacher.email}
              </Card.Text>
              <Button variant="danger" onClick={() => handleDelete(teacher.id)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Students */}
      <div className="admin-section">
        <h4>Registered Students</h4>
        {students.length === 0 ? (
          <p>No students found.</p>
        ) : (
          students.map((student) => (
            <Card key={student.id} className="mb-3 admin-card">
              <Card.Body>
                <Card.Title>{student.name || student.email}</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {student.email} <br />
                  <strong>Status:</strong>{" "}
                  {student.approved ? (
                    <span className="text-success">Approved ✅</span>
                  ) : (
                    <span className="text-warning">Pending ⏳</span>
                  )}
                </Card.Text>
                {!student.approved && (
                  <Button
                    variant="success"
                    onClick={() => handleApprove(student.id)}
                  >
                    Approve
                  </Button>
                )}
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

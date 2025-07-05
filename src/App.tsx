import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css";

// Pages & Components
import LoginForm from "./components/LoginForm";
import StudentDashboard from "./components/StudentDashboard";
import StudentRegister from "./pages/StudentRegister";
import TeacherLogin from "./pages/TeacherLogin";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherAppointments from "./components/TeacherAppointments";

function App() {
  return (
    <Router>
      <AppNavbar />

      <div className="container py-4" style={{ minHeight: "85vh" }}>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Student routes */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<StudentRegister />} />
          <Route path="/student-register" element={<StudentRegister />} />
          <Route path="/StudentDashboard" element={<StudentDashboard />} />

          {/* Teacher & Admin routes */}
          <Route path="/teacher-login" element={<TeacherLogin />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route
            path="/TeacherAppointments"
            element={<TeacherAppointments />}
          />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;

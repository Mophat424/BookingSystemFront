import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/login/userSlice";
import type { RootState } from "./app/store";

// Pages
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import Register from './pages/auth/Register';
import VerifyUser from "./pages/auth/VerifyUser";
import Login from "./pages/auth/Login";

// Dashboards and Components
import AdminDashboard from "./dashboard/AdminDashboard/AdminDashboard";
import Analytics from "./dashboard/AdminDashboard/Analytics/Analytics"; // NEW import
import UserDashboard from "./dashboard/UserDashboard/UserDashboard";
import ManageEvents from "./dashboard/AdminDashboard/ManageEvents/ManageEvents";
import ManageBookings from "./dashboard/AdminDashboard/ManageBookings/ManageBookings";
import ManageSupportTickets from "./dashboard/AdminDashboard/ManageSupportTickets/ManageSupportTickets";
import ManagePayments from "./dashboard/AdminDashboard/ManagePayments/ManagePayments";
import Users from "./dashboard/AdminDashboard/ManageUsers/Users";
import Events from "./dashboard/UserDashboard/Events/Events";
import BookingHistory from "./dashboard/UserDashboard/Bookings/BookingHistory";
import ProfileManagement from "./dashboard/UserDashboard/Profile/ProfileManagement";

// Component to check authentication and role
const AuthChecker = () => {
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state: RootState) => state.user);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (token && !isAuthenticated) {
        dispatch(logout());
      }
      setIsChecking(false);
    };
    checkAuth();
  }, [dispatch, token, isAuthenticated]);

  if (isChecking) return null; // Prevent rendering until auth check completes
  return null;
};

// Protected Route wrapper
const ProtectedRoute = ({
  children,
  requiredRole,
  redirectTo = "/login",
}: {
  children: React.ReactNode;
  requiredRole?: "admin";
  redirectTo?: string;
}) => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.user) || { user: null, isAuthenticated: false };

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/user/dashboard" replace />;
  }
  return children;
};

// NotFoundPage (basic fallback)
const NotFoundPage = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>404 - Page Not Found</div>
);

function App() {
  return (
    <Router>
      <AuthChecker />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyUser />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="events" element={<ManageEvents />} />
          <Route path="bookings" element={<ManageBookings />} />
          <Route path="support-tickets" element={<ManageSupportTickets />} />
          <Route path="payments" element={<ManagePayments />} />
          <Route path="users" element={<Users />} />
          <Route path="analytics" element={<Analytics />} /> {/* Integrated from your request */}
        </Route>

        {/* User Dashboard */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="events" element={<Events />} />
          <Route path="bookings/history" element={<BookingHistory />} />
          <Route path="profile" element={<ProfileManagement />} />
          <Route path="payments" element={<div>Payments Placeholder</div>} />
        </Route>

        {/* Catch-all Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;








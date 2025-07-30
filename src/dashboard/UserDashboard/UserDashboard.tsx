// import { useState } from "react";
// import { Route, Routes } from "react-router-dom";
// import Navbar from "../../components/nav/Nav";
// import UserDrawer from "./aside/UserDrawer";
// import { FaBars } from "react-icons/fa";
// import { IoCloseSharp } from "react-icons/io5";
// import Footer from "../../components/footer/Footer";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../app/store";
// import "./UserDashboard.css";
// import Events from "./Events/Events";
// import BookingHistory from "./Bookings/BookingHistory";
// import ProfileManagement from "./Profile/ProfileManagement";

// const UserDashboard = () => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const { user } = useSelector((state: RootState) => state.user);

//   const handleDrawerToggle = () => {
//     setDrawerOpen((prev) => !prev);
//     console.log("Drawer toggle to:", !drawerOpen); // Debug log
//   };

//   if (!user || user.role !== "user") {
//     return <div className="access-denied">Access denied. Users only!</div>;
//   }

//   return (
//     <div className="user-dashboard">
//       <Navbar />
//       <div className="user-header">
//         <button
//           className="toggle-button"
//           onClick={handleDrawerToggle}
//           aria-label={drawerOpen ? "Close menu" : "Open menu"}
//         >
//           {drawerOpen ? <IoCloseSharp /> : <FaBars />}
//         </button>
//         <span className="dashboard-title">Welcome to your User Dashboard</span>
//       </div>
//       <div className="user-body">
//         <aside className={`user-aside ${drawerOpen ? "open" : "closed"}`}>
//           <UserDrawer />
//         </aside>
//         <main className="user-main">
//           <Routes>
//             <Route path="events" element={<Events />} />
//             <Route path="bookings/history" element={<BookingHistory />} />
//             <Route path="profile" element={<ProfileManagement />} />
//             <Route path="payments" element={<div>Payments Placeholder</div>} />
//           </Routes>
//         </main>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default UserDashboard;





import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../components/nav/Nav";
import UserDrawer from "./aside/UserDrawer";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import Footer from "../../components/footer/Footer";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import "./UserDashboard.css";
import Events from "./Events/Events";
import BookingHistory from "./Bookings/BookingHistory";
import ProfileManagement from "./Profile/ProfileManagement";

const UserDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
    console.log("Drawer toggle to:", !drawerOpen); // Debug log
  };

  if (!user || user.role !== "user") {
    return <div className="access-denied">Access denied. Users only!</div>;
  }

  return (
    <div className="user-dashboard">
      <Navbar />
      <div className="user-header">
        <button
          className="toggle-button"
          onClick={handleDrawerToggle}
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
        >
          {drawerOpen ? <IoCloseSharp /> : <FaBars />}
        </button>
        <span className="dashboard-title">Welcome to your User Dashboard</span>
      </div>
      <div className="user-body">
        <aside className={`user-aside ${drawerOpen ? "open" : "closed"}`}>
          <UserDrawer />
        </aside>
        <main className="user-main">
          {!drawerOpen && (
            <div className="default-view">
              <h2>Welcome, User!</h2>
              <p>Explore events, view your bookings, or manage your profile from the sidebar.</p>
              <p>Click the menu icon to get started.</p>
            </div>
          )}
          {drawerOpen && (
            <Routes>
              <Route path="events" element={<Events />} />
              <Route path="bookings/history" element={<BookingHistory />} />
              <Route path="profile" element={<ProfileManagement />} />
              <Route path="payments" element={<div>Payments Placeholder</div>} />
            </Routes>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
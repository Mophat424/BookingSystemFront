// import { useState, useEffect, useRef } from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "../../components/nav/Nav";
// import AdminDrawer from "./aside/AdminDrawer";
// import { FaBars } from "react-icons/fa";
// import { IoCloseSharp } from "react-icons/io5";
// import Footer from "../../components/footer/Footer";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../app/store";
// import './AdminDashboard.css';

// const AdminDashboard = () => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const { user } = useSelector((state: RootState) => state.user);
//   const revenueCanvasRef = useRef<HTMLCanvasElement>(null);
//   const usersEventsCanvasRef = useRef<HTMLCanvasElement>(null);

//   const analytics = {
//     revenue: [5000, 3000, 2000],
//     users: 150,
//     events: 45,
//   };

//   const handleDrawerToggle = () => {
//     setDrawerOpen((prev) => !prev);
//   };

//   // Draw Pie Chart for Revenue
//   useEffect(() => {
//     const ctx = revenueCanvasRef.current?.getContext("2d");
//     if (ctx) {
//       ctx.clearRect(0, 0, 200, 200);
//       const total = analytics.revenue.reduce((a, b) => a + b, 0);
//       let startAngle = 0;
//       analytics.revenue.forEach((value) => {
//         const sliceAngle = (value / total) * 2 * Math.PI;
//         ctx.beginPath();
//         ctx.moveTo(100, 100);
//         ctx.arc(100, 100, 80, startAngle, startAngle + sliceAngle);
//         ctx.fillStyle = `hsl(${(startAngle * 180) / Math.PI}, 70%, 50%)`;
//         ctx.fill();
//         startAngle += sliceAngle;
//       });
//     }
//   }, [analytics.revenue]);

//   // Draw Bar Graph for Users and Events
//   useEffect(() => {
//     const ctx = usersEventsCanvasRef.current?.getContext("2d");
//     if (ctx) {
//       ctx.clearRect(0, 0, 300, 150);
//       ctx.fillStyle = "#333";
//       ctx.fillRect(50, 100 - (analytics.users / 200 * 100), 50, (analytics.users / 200 * 100));
//       ctx.fillRect(120, 100 - (analytics.events / 100 * 100), 50, (analytics.events / 100 * 100));
//       ctx.fillStyle = "#fff";
//       ctx.font = "12px Arial";
//       ctx.fillText("Users", 50, 110);
//       ctx.fillText("Events", 120, 110);
//     }
//   }, [analytics.users, analytics.events]);

//   if (user?.role !== "admin") {
//     return <div className="access-denied">Access denied. Admins only!</div>;
//   }

//   return (
//     <div className="admin-dashboard">
//       <Navbar />
//       <div className="admin-header">
//         <button className="toggle-button" onClick={handleDrawerToggle}>
//           {drawerOpen ? <IoCloseSharp /> : <FaBars />}
//         </button>
//         <span className="dashboard-title">Welcome to your Admin Dashboard</span>
//       </div>
//       <div className="admin-body">
//         <aside className={`admin-aside ${drawerOpen ? "open" : "closed"}`}>
//           <AdminDrawer />
//         </aside>
//         <main className="admin-main">
//           {!drawerOpen && (
//             <div className="default-view">
//               <h2>Welcome, Admin!</h2>
//               <div className="analytics-container">
//                 <div className="analytics-card">
//                   <h3>Revenue</h3>
//                   <canvas ref={revenueCanvasRef} width="200" height="200" />
//                   <p>Total: ${analytics.revenue.reduce((a, b) => a + b, 0)}</p>
//                 </div>
//                 <div className="analytics-card">
//                   <h3>Users & Events</h3>
//                   <canvas ref={usersEventsCanvasRef} width="300" height="150" />
//                   <p>Users: {analytics.users}</p>
//                   <p>Events: {analytics.events}</p>
//                 </div>
//               </div>
//               <p>Manage details from the sidebar menu.</p>
//               <p>Click the menu icon to get started.</p>
//             </div>
//           )}
//           {drawerOpen && <Outlet />}
//         </main>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default AdminDashboard;













import { useState, useEffect, useRef, useCallback } from "react"; // Added useCallback
import { Outlet } from "react-router-dom";
import Navbar from "../../components/nav/Nav";
import AdminDrawer from "./aside/AdminDrawer";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import Footer from "../../components/footer/Footer";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const revenueCanvasRef = useRef<HTMLCanvasElement>(null);
  const usersEventsCanvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);
  const [analytics, setAnalytics] = useState({
    revenue: [5000, 3000, 2000],
    users: 150,
    events: 45,
    trends: {
      users: [120, 130, 140, 150, 145, 155],
      events: [30, 35, 40, 45, 42, 48],
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
  });

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  // Memoized fetchAnalytics function
  const fetchAnalytics = useCallback(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newRevenue = analytics.revenue.map(v => v + (Math.random() - 0.5) * 500);
        const newUsers = Math.max(100, analytics.users + (Math.random() - 0.5) * 10);
        const newEvents = Math.max(30, analytics.events + (Math.random() - 0.5) * 5);
        const newTrends = {
          users: analytics.trends.users.map(v => Math.max(100, v + (Math.random() - 0.5) * 5)),
          events: analytics.trends.events.map(v => Math.max(20, v + (Math.random() - 0.5) * 3)),
          labels: analytics.trends.labels,
        };
        resolve({ revenue: newRevenue, users: newUsers, events: newEvents, trends: newTrends });
      }, 1000); // Simulate 1-second API delay
    });
  }, [analytics]); // Dependency on analytics to ensure it uses the latest state

  // Fetch and update analytics every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchAnalytics().then((data) => setAnalytics(data as typeof analytics));
    }, 5000);
    return () => clearInterval(interval);
  }, [fetchAnalytics]); // Updated dependency array

  // Draw Pie Chart for Revenue with Tooltip
  useEffect(() => {
    const ctx = revenueCanvasRef.current?.getContext("2d");
    if (ctx && user?.role === "admin") {
      ctx.clearRect(0, 0, 200, 200);
      const total = analytics.revenue.reduce((a, b) => a + b, 0);
      let startAngle = 0;
      analytics.revenue.forEach((value, index) => {
        const sliceAngle = (value / total) * 2 * Math.PI;
        ctx.beginPath();
        ctx.moveTo(100, 100);
        ctx.arc(100, 100, 80, startAngle, startAngle + sliceAngle);
        ctx.fillStyle = `hsl(${(startAngle * 180) / Math.PI}, 70%, ${50 + index * 10}%)`;
        ctx.fill();
        if (hoveredSlice === index) {
          ctx.beginPath();
          ctx.arc(100, 100, 85, 0, 2 * Math.PI);
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.fillStyle = "#fff";
          ctx.font = "12px Arial";
          ctx.fillText(`${(value / total * 100).toFixed(1)}%`, 90, 100);
        }
        startAngle += sliceAngle;
      });
      revenueCanvasRef.current?.addEventListener("mousemove", (e) => {
        const rect = revenueCanvasRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const dx = x - 100;
        const dy = y - 100;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= 80) {
          let angle = Math.atan2(dy, dx);
          if (angle < 0) angle += 2 * Math.PI;
          let sliceIndex = 0;
          let cumulativeAngle = 0;
          analytics.revenue.forEach((value, i) => {
            const sliceAngle = (value / total) * 2 * Math.PI;
            if (angle <= cumulativeAngle + sliceAngle) {
              sliceIndex = i;
              return;
            }
            cumulativeAngle += sliceAngle;
          });
          setHoveredSlice(sliceIndex);
        } else {
          setHoveredSlice(null);
        }
      });
    }
  }, [analytics.revenue, hoveredSlice, user]);

  // Draw Bar Graph for Users and Events
  useEffect(() => {
    const ctx = usersEventsCanvasRef.current?.getContext("2d");
    if (ctx && user?.role === "admin") {
      ctx.clearRect(0, 0, 300, 150);
      ctx.fillStyle = "#4CAF50";
      ctx.fillRect(50, 150 - (analytics.users / 200 * 140), 50, (analytics.users / 200 * 140));
      ctx.fillStyle = "#2196F3";
      ctx.fillRect(120, 150 - (analytics.events / 100 * 140), 50, (analytics.events / 100 * 140));
      ctx.fillStyle = "#fff";
      ctx.font = "12px Arial";
      ctx.fillText(analytics.users.toFixed(0), 50, 150 - (analytics.users / 200 * 140) - 5);
      ctx.fillText(analytics.events.toFixed(0), 120, 150 - (analytics.events / 100 * 140) - 5);
      ctx.fillText("Users", 50, 160);
      ctx.fillText("Events", 120, 160);
    }
  }, [analytics.users, analytics.events, user]);

  if (user?.role !== "admin") {
    return <div className="access-denied">Access denied. Admins only!</div>;
  }

  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="admin-header">
        <button className="toggle-button" onClick={handleDrawerToggle}>
          {drawerOpen ? <IoCloseSharp /> : <FaBars />}
        </button>
        <span className="dashboard-title">Welcome to your Admin Dashboard</span>
      </div>
      <div className="admin-body">
        <aside className={`admin-aside ${drawerOpen ? "open" : "closed"}`}>
          <AdminDrawer />
        </aside>
        <main className="admin-main">
          {!drawerOpen && (
            <div className="default-view">
              <h2>Welcome, Admin!</h2>
              <div className="analytics-container">
                <div className="analytics-card">
                  <h3>Revenue Breakdown</h3>
                  <canvas ref={revenueCanvasRef} width="200" height="200" />
                  <div className="legend">
                    <span style={{ color: "#FF6384" }}>Tickets: $${analytics.revenue[0].toFixed(0)}</span>
                    <span style={{ color: "#36A2EB" }}>Merch: $${analytics.revenue[1].toFixed(0)}</span>
                    <span style={{ color: "#FFCE56" }}>Other: $${analytics.revenue[2].toFixed(0)}</span>
                  </div>
                  <p>Total: $${analytics.revenue.reduce((a, b) => a + b, 0).toFixed(0)}</p>
                </div>
                <div className="analytics-card">
                  <h3>Users & Events</h3>
                  <canvas ref={usersEventsCanvasRef} width="300" height="150" />
                  <p>Users: {analytics.users.toFixed(0)}</p>
                  <p>Events: {analytics.events.toFixed(0)}</p>
                </div>
              </div>
              <p>Manage details from the sidebar menu.</p>
              <p>Click the menu icon to get started.</p>
            </div>
          )}
          {drawerOpen && <Outlet />}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
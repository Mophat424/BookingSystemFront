import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

const Analytics = () => {
  const revenueCanvasRef = useRef<HTMLCanvasElement>(null);
  const usersEventsCanvasRef = useRef<HTMLCanvasElement>(null);
  const trendCanvasRef = useRef<HTMLCanvasElement>(null);
  const { user } = useSelector((state: RootState) => state.user);
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

  const analytics = {
    revenue: [5000, 3000, 2000],
    users: 150,
    events: 45,
    trends: {
      users: [120, 130, 140, 150, 145, 155],
      events: [30, 35, 40, 45, 42, 48],
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
  };

  // Draw Pie Chart for Revenue with Tooltip
  useEffect(() => {
    const ctx = revenueCanvasRef.current?.getContext("2d");
    if (ctx && user?.role === "admin") {
      ctx.clearRect(0, 0, 300, 300);
      const total = analytics.revenue.reduce((a, b) => a + b, 0);
      let startAngle = 0;
      analytics.revenue.forEach((value, index) => {
        const sliceAngle = (value / total) * 2 * Math.PI;
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 120, startAngle, startAngle + sliceAngle);
        ctx.fillStyle = `hsl(${(startAngle * 180) / Math.PI}, 70%, ${50 + index * 10}%)`;
        ctx.fill();
        if (hoveredSlice === index) {
          ctx.beginPath();
          ctx.arc(150, 150, 125, 0, 2 * Math.PI);
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.fillStyle = "#fff";
          ctx.font = "14px Arial";
          ctx.fillText(`${((value / total) * 100).toFixed(1)}%`, 140, 150);
        }
        startAngle += sliceAngle;
      });

      // Tooltip hover
      revenueCanvasRef.current?.addEventListener("mousemove", (e) => {
        const rect = revenueCanvasRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const dx = x - 150;
        const dy = y - 150;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= 120) {
          let angle = Math.atan2(dy, dx);
          if (angle < 0) angle += 2 * Math.PI;
          let sliceIndex = 0;
          let cumulativeAngle = 0;
          for (let i = 0; i < analytics.revenue.length; i++) {
            const value = analytics.revenue[i];
            const sliceAngle = (value / total) * 2 * Math.PI;
            if (angle <= cumulativeAngle + sliceAngle) {
              sliceIndex = i;
              break;
            }
            cumulativeAngle += sliceAngle;
          }
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
      ctx.clearRect(0, 0, 400, 200);
      const userBarHeight = (analytics.users / 200) * 180;
      const eventBarHeight = (analytics.events / 100) * 180;

      ctx.fillStyle = "#4CAF50";
      ctx.fillRect(50, 200 - userBarHeight, 80, userBarHeight);
      ctx.fillStyle = "#2196F3";
      ctx.fillRect(150, 200 - eventBarHeight, 80, eventBarHeight);

      ctx.fillStyle = "#fff";
      ctx.font = "14px Arial";
      ctx.fillText(analytics.users.toFixed(0), 50, 200 - userBarHeight - 5);
      ctx.fillText(analytics.events.toFixed(0), 150, 200 - eventBarHeight - 5);
      ctx.fillText("Users", 50, 210);
      ctx.fillText("Events", 150, 210);
    }
  }, [analytics.users, analytics.events, user]);

  // Draw Line Graph for Trends
  useEffect(() => {
    const ctx = trendCanvasRef.current?.getContext("2d");
    if (ctx && user?.role === "admin") {
      ctx.clearRect(0, 0, 500, 200);

      // Users line
      ctx.beginPath();
      ctx.strokeStyle = "#4CAF50";
      ctx.lineWidth = 2;
      analytics.trends.users.forEach((value, index) => {
        const x = 50 + (index * 100) / 5;
        const y = 200 - (value / 200) * 180;
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Events line
      ctx.beginPath();
      ctx.strokeStyle = "#2196F3";
      analytics.trends.events.forEach((value, index) => {
        const x = 50 + (index * 100) / 5;
        const y = 200 - (value / 100) * 180;
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Labels
      ctx.fillStyle = "#fff";
      ctx.font = "12px Arial";
      analytics.trends.labels.forEach((label, index) => {
        const x = 50 + (index * 100) / 5 - 10;
        ctx.fillText(label, x, 210);
      });
    }
  }, [analytics.trends, user]);

  if (user?.role !== "admin") {
    return <div className="access-denied">Access denied. Admins only!</div>;
  }

  return (
    <div className="analytics-page">
      <h2>Analytics Dashboard</h2>
      <div className="analytics-container">
        <div className="analytics-card">
          <h3>Revenue Breakdown</h3>
          <canvas ref={revenueCanvasRef} width="300" height="300" />
          <div className="legend">
            <span style={{ color: "#FF6384" }}>Tickets: $5000</span>
            <span style={{ color: "#36A2EB" }}>Merch: $3000</span>
            <span style={{ color: "#FFCE56" }}>Other: $2000</span>
          </div>
          <p>Total Revenue: ${analytics.revenue.reduce((a, b) => a + b, 0)}</p>
        </div>
        <div className="analytics-card">
          <h3>Users & Events</h3>
          <canvas ref={usersEventsCanvasRef} width="400" height="200" />
          <p>Total Users: {analytics.users}</p>
          <p>Total Events: {analytics.events}</p>
        </div>
        <div className="analytics-card">
          <h3>Trends (Last 6 Months)</h3>
          <canvas ref={trendCanvasRef} width="500" height="200" />
          <p>Users & Events Growth</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

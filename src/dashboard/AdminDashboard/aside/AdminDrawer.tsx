
// src/dashboard/AdminDashboard/aside/AdminDrawer.tsx
import { Link } from "react-router-dom";
import { adminDrawerData } from "./drawerData";

const AdminDrawer = () => {
  return (
    <div className="drawer-container">
      <h2>Dashboard Menu</h2>
      <ul>
        {adminDrawerData.map((item) => (
          <li key={item.id}>
            <Link
              to={item.link}
              className="flex items-center space-x-3 text-white hover:bg-gray-700 p-4"
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDrawer;
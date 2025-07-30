import { Link } from "react-router-dom";
import { userDrawerData } from "./drawerData";

const UserDrawer = () => {
  return (
    <div className="drawer-container">
      <h2>Dashboard Menu</h2>
      <ul>
        {userDrawerData.map((item) => (
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

export default UserDrawer;











// import { Link } from "react-router-dom";
// import { userDrawerData } from "./drawerData";
// import type { DrawerData } from "./drawerData"; // Explicit typing
// import "./UserDrawer.css";

// const UserDrawer = () => {
//   return (
//     <div className="drawer-container">
//       <h2>Dashboard Menu</h2>
//       <ul>
//         {userDrawerData.map((item: DrawerData) => (
//           <li key={item.id}>
//             <Link
//               to={item.link} // Relative path (e.g., "events", "bookings/history")
//               className="drawer-item flex items-center space-x-3 text-white hover:bg-gray-700 p-4"
//               onClick={(e) => {
//                 e.preventDefault(); // Prevent default if needed, though Link handles this
//                 window.scrollTo(0, 0); // Scroll to top
//                 // Let Link handle navigation
//               }}
//             >
//               <item.icon size={20} />
//               <span>{item.name}</span>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserDrawer;
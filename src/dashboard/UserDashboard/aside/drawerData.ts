// import { MdEvent } from "react-icons/md"; // Events
// import { FaTicketAlt } from "react-icons/fa"; // Bookings
// import { FiUser } from "react-icons/fi"; // Profile
// import { RiMoneyDollarCircleFill } from "react-icons/ri"; // Payments

// export type DrawerData = {
//   id: string;
//   name: string;
//   icon: React.ComponentType<{ size?: number }>;
//   link: string;
// };

// export const userDrawerData: DrawerData[] = [
//   {
//     id: "events",
//     name: "Events",
//     icon: MdEvent,
//     link: "events",
//   },
//   {
//     id: "bookings",
//     name: "Bookings",
//     icon: FaTicketAlt,
//     link: "bookings",
//   },
//   {
//     id: "profile",
//     name: "Profile",
//     icon: FiUser,
//     link: "profile",
//   },
//   {
//     id: "payments",
//     name: "Payments",
//     icon: RiMoneyDollarCircleFill,
//     link: "payments",
//   },
// ];















// import { FaTicketAlt } from "react-icons/fa";
// import { FiUser } from "react-icons/fi";
// import { RiMoneyDollarCircleFill } from "react-icons/ri";
// import { MdEvent } from "react-icons/md";

// export type DrawerData = {
//   id: string;
//   name: string;
//   icon: React.ComponentType<{ size?: number }>;
//   link: string;
// };

// export const userDrawerData: DrawerData[] = [
//   {
//     id: "events",
//     name: "Events",
//     icon: MdEvent,
//     link: "events",
//   },
//   {
//     id: "bookings",
//     name: "Bookings",
//     icon: FaTicketAlt,
//     link: "bookings/history", // Updated to point to the history page
//   },
//   {
//     id: "profile",
//     name: "Profile",
//     icon: FiUser,
//     link: "profile",
//   },
//   {
//     id: "payments",
//     name: "Payments",
//     icon: RiMoneyDollarCircleFill,
//     link: "payments",
//   },
// ];





import { FaTicketAlt } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdEvent } from "react-icons/md";

export type DrawerData = {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  link: string;
};

export const userDrawerData: DrawerData[] = [
  {
    id: "events",
    name: "Events",
    icon: MdEvent,
    link: "events",
  },
  {
    id: "bookings",
    name: "Bookings",
    icon: FaTicketAlt,
    link: "bookings/history",
  },
  {
    id: "profile",
    name: "Profile",
    icon: FiUser,
    link: "profile",
  },
  {
    id: "payments",
    name: "Payments",
    icon: RiMoneyDollarCircleFill,
    link: "payments",
  },
];
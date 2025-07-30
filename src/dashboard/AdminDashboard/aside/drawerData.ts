// src/dashboard/AdminDashboard/drawerData.ts
import { TbBrandGoogleAnalytics } from "react-icons/tb"; // Analytics
import { FiUsers } from "react-icons/fi"; // Users
import { MdEvent } from "react-icons/md"; // Events
import { FaTicketAlt } from "react-icons/fa"; // Bookings
import { RiMoneyDollarCircleFill } from "react-icons/ri"; // Payments
import { FaHeadset } from "react-icons/fa"; // Support Tickets

export type DrawerData = {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  link: string;
};

export const adminDrawerData: DrawerData[] = [
  {
    id: "users",
    name: "Manage Users",
    icon: FiUsers,
    link: "users",
  },
  {
    id: "events",
    name: "Manage Events",
    icon: MdEvent,
    link: "events",
  },
  {
    id: "bookings",
    name: "Manage Bookings",
    icon: FaTicketAlt,
    link: "bookings",
  },
  {
    id: "payments",
    name: "Manage Payments",
    icon: RiMoneyDollarCircleFill,
    link: "payments",
  },
  {
    id: "support-tickets",
    name: "Support Tickets",
    icon: FaHeadset,
    link: "support-tickets",
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: TbBrandGoogleAnalytics,
    link: "analytics",
  },
];
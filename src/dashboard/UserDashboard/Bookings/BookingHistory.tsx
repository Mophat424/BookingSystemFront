
// import { useState, useEffect, Component } from "react";
// import type {ReactNode} from "react";
// import { useAppSelector } from "../../../app/store";
// import "../UserDashboard.css";

// // Error Boundary Component
// class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
//   constructor(props: { children: ReactNode }) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError() { // Removed unused parameter
//     return { hasError: true };
//   }

//   render() {
//     if (this.state.hasError) {
//       return <p className="error">Something went wrong. Please try again later.</p>;
//     }
//     return this.props.children;
//   }
// }

// interface Booking {
//   booking_id: number;
//   event_id: number;
//   quantity: number;
//   total_amount: string;
//   booking_status: string;
//   created_at: string;
//   event?: {
//     title: string;
//     date: string;
//   }; // Made optional
// }

// const BookingHistory = () => {
//   const userState = useAppSelector((state) => state.user);
//   const token = userState?.token ?? null; // Safely handle undefined userState
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       setLoading(true);
//       setError(null);
//       if (!token) {
//         setError("Authentication token is missing");
//         setLoading(false);
//         return; // Moved log outside to avoid dependency warning
//       }

//       try {
//         const response = await fetch("http://localhost:8081/bookings", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`Failed to fetch bookings: ${response.status} ${response.statusText} - ${errorText}`);
//         }
//         const data = await response.json();
//         console.log("Bookings data:", data); // Debug the raw data
//         if (Array.isArray(data)) {
//           setBookings(data);
//         } else {
//           throw new Error("Invalid data format: Expected an array of bookings");
//         }
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Network error");
//         console.error("Fetch error details:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, [token]); // Only token is a dependency

//   // Log userState only if there's an error, outside the effect
//   if (!token && !error) {
//     console.log("No token found in userState:", userState);
//   }

//   if (loading) return <p className="loading">Loading bookings...</p>;
//   if (error) return <p className="error">Error loading bookings: {error}</p>;

//   return (
//     <ErrorBoundary>
//       <div className="booking-history">
//         <h2 className="title">My Bookings</h2>
//         {bookings.length === 0 ? (
//           <p className="no-bookings">No bookings found.</p>
//         ) : (
//           <table className="bookings-table">
//             <thead>
//               <tr>
//                 <th>Event Title</th>
//                 <th>Date</th>
//                 <th>Quantity</th>
//                 <th>Total Amount</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((booking) => (
//                 <tr key={booking.booking_id} className="bookings-table-row">
//                   <td className="bookings-table-cell">{booking.event?.title || "Unknown Event"}</td>
//                   <td className="bookings-table-cell">{booking.event?.date ? new Date(booking.event.date).toLocaleDateString() : "N/A"}</td>
//                   <td className="bookings-table-cell">{booking.quantity}</td>
//                   <td className="bookings-table-cell">{booking.total_amount}</td>
//                   <td className="bookings-table-cell">{booking.booking_status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </ErrorBoundary>
//   );
// };

// export default BookingHistory;







import { useState, useEffect, Component } from "react";
import type { ReactNode } from "react";
import { useAppSelector } from "../../../app/store";
import "../UserDashboard.css";

// Error Boundary Component
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <p className="error">Something went wrong. Please try again later.</p>;
    }
    return this.props.children;
  }
}

interface Booking {
  booking_id: number;
  user_id: number;
  event_id: number;
  quantity: number;
  total_amount: string;
  booking_status: string;
  created_at: string;
  event?: {
    title: string;
    date: string;
  };
}

const BookingHistory = () => {
  const userState = useAppSelector((state) => state.user);
  const token = userState?.token ?? null;
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      if (!token) {
        setError("Authentication token is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8081/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch bookings: ${response.status} ${response.statusText} - ${errorText}`);
        }
        const data = await response.json();
        console.log("Bookings data:", data); // Debug the raw data
        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          throw new Error("Invalid data format: Expected an array of bookings");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Network error");
        console.error("Fetch error details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  if (!token && !error) {
    console.log("No token found in userState:", userState);
  }

  if (loading) return <p className="loading">Loading bookings...</p>;
  if (error) return <p className="error">Error loading bookings: {error}</p>;

  return (
    <ErrorBoundary>
      <div className="booking-history">
        <h2 className="title">My Bookings</h2>
        {bookings.length === 0 ? (
          <p className="no-bookings">No bookings found.</p>
        ) : (
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Event Title</th>
                <th>Date</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.booking_id} className="bookings-table-row">
                  <td className="bookings-table-cell">{booking.event?.title || "Unknown Event"}</td>
                  <td className="bookings-table-cell">
                    {booking.event?.date ? new Date(booking.event.date).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="bookings-table-cell">{booking.quantity}</td>
                  <td className="bookings-table-cell">{booking.total_amount}</td>
                  <td className="bookings-table-cell">{booking.booking_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default BookingHistory;
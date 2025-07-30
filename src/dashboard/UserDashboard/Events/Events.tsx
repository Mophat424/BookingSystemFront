// import { useState, useEffect } from "react";
// import { useAppSelector } from "../../../app/store";
// import { useNavigate } from "react-router-dom";
// import "../UserDashboard.css"; // Base styles
// import "./Event.css"; // Specific event styles

// // Type for API response
// interface ApiEvent {
//   event_id: number;
//   title: string;
//   venue_id: number;
//   category: string;
//   date: string;
//   time: string;
//   ticket_price: string;
//   tickets_total: number;
//   tickets_sold?: number; // Optional
//   description?: string; // Optional
// }

// // Type for frontend display
// interface Event {
//   event_id: number;
//   title: string;
//   venueId: number;
//   date: string;
//   category: string;
//   available_tickets: number;
// }

// // Define the expected user state shape
// interface UserState {
//   token: string | null;
//   // Add other properties if they exist in your store
// }

// const Events = () => {
//   const userState = useAppSelector((state) => state.user) as UserState | undefined;
//   const token = userState?.token ?? null; // Safely handle undefined userState
//   const [events, setEvents] = useState<Event[]>([]);
//   const [filters, setFilters] = useState({ date: "", category: "" });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [quantity, setQuantity] = useState<number>(1);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEvents = async () => {
//       setLoading(true);
//       try {
//         if (!token) {
//           setError("Authentication token is missing");
//           return;
//         }
//         const response = await fetch("http://localhost:8081/events", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!response.ok) throw new Error("Failed to fetch events");
//         const result = await response.json();
//         const mappedEvents = result.map((event: ApiEvent) => ({
//           event_id: event.event_id,
//           title: event.title,
//           venueId: event.venue_id,
//           date: event.date,
//           category: event.category,
//           available_tickets: event.tickets_total - (event.tickets_sold || 0),
//         }));
//         setEvents(mappedEvents);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Network error");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEvents();
//   }, [token]);

//   const filteredEvents = events.filter((event) =>
//     (filters.date ? event.date.includes(filters.date) : true) &&
//     (filters.category ? event.category.toLowerCase().includes(filters.category.toLowerCase()) : true)
//   );

//   const handleBook = async (eventId: number) => {
//     if (!token) {
//       setError("Please log in to book an event");
//       return;
//     }
//     const event = events.find(e => e.event_id === eventId);
//     if (!event || quantity < 1 || quantity > event.available_tickets) {
//       setError("Invalid quantity or insufficient tickets");
//       return;
//     }
//     try {
//       const response = await fetch("http://localhost:8081/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ event_id: eventId, quantity }),
//       });
//       if (!response.ok) throw new Error("Booking failed");
//       setError(null);
//       navigate("/user/dashboard/bookings/history");
//       console.log("Booking response:", await response.json()); // Debug booking result
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Network error");
//     }
//   };

//   return (
//     <div className="events-container">
//       <h2 className="events-title">Events</h2>
//       <div className="events-filters">
//         <input
//           type="date"
//           value={filters.date}
//           onChange={(e) => setFilters({ ...filters, date: e.target.value })}
//           className="events-filter-input"
//         />
//         <input
//           type="text"
//           placeholder="Filter by category"
//           value={filters.category}
//           onChange={(e) => setFilters({ ...filters, category: e.target.value })}
//           className="events-filter-input"
//         />
//       </div>
//       {loading && <p className="events-loading">Loading events...</p>}
//       {error && <p className="events-error">{error}</p>}
//       {filteredEvents.length > 0 ? (
//         <table className="events-table">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Venue ID</th>
//               <th>Date</th>
//               <th>Category</th>
//               <th>Available Tickets</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEvents.map((event) => (
//               <tr key={event.event_id} className="events-table-row">
//                 <td className="events-table-cell">{event.title}</td>
//                 <td className="events-table-cell">{event.venueId}</td>
//                 <td className="events-table-cell">{new Date(event.date).toLocaleDateString()}</td>
//                 <td className="events-table-cell">{event.category}</td>
//                 <td className="events-table-cell">{event.available_tickets}</td>
//                 <td className="events-table-cell">
//                   <input
//                     type="number"
//                     value={quantity}
//                     onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
//                     min="1"
//                     max={event.available_tickets}
//                     className="quantity-input"
//                   />
//                   <button
//                     className="events-book-button"
//                     onClick={() => handleBook(event.event_id)}
//                   >
//                     Book
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="events-no-events">No events found.</p>
//       )}
//     </div>
//   );
// };

// export default Events;







// import { useState, useEffect } from "react";
// import { useAppSelector } from "../../../app/store";
// import { useNavigate } from "react-router-dom";
// import "../UserDashboard.css";
// import "./Event.css";

// // Match the Event interface from eventSlice.ts
// export interface Event {
//   event_id: number;
//   title: string;
//   description: string;
//   venue_id: number;
//   category: string;
//   date: string;
//   time: string;
//   ticket_price: number; // Added to match backend
//   tickets_total: number;
//   tickets_sold: number;
//   created_at: string;
//   updated_at: string;
//   venue?: {
//     venue_id: number;
//     name: string;
//     address: string;
//     capacity: number;
//     created_at: string;
//   };
// }

// // ApiEvent for raw response (simplified)
// interface ApiEvent {
//   event_id: number;
//   title: string;
//   venue_id: number;
//   category: string;
//   date: string;
//   time: string;
//   ticket_price: number; // Ensure this is in the response
//   tickets_total: number;
//   tickets_sold?: number;
//   description?: string;
// }

// // Updated UserState to handle potential store shape
// interface UserState {
//   token: string | null;
//   user?: { id: number } | null; // Adjusted to match potential Redux shape
// }

// const Events = () => {
//   const userState = useAppSelector((state) => state.user) as unknown as UserState; // Safe cast to avoid type warning
//   const token = userState?.token ?? null;
//   const userId = userState?.user?.id; // Safely access user_id
//   const [events, setEvents] = useState<Event[]>([]);
//   const [filters, setFilters] = useState({ date: "", category: "" });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEvents = async () => {
//       setLoading(true);
//       try {
//         if (!token) {
//           setError("Authentication token is missing");
//           return;
//         }
//         const response = await fetch("http://localhost:8081/events", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!response.ok) throw new Error("Failed to fetch events");
//         const result = await response.json();
//         const mappedEvents = result.map((event: ApiEvent) => ({
//           event_id: event.event_id,
//           title: event.title,
//           description: event.description || "",
//           venue_id: event.venue_id,
//           category: event.category,
//           date: event.date,
//           time: event.time,
//           ticket_price: event.ticket_price, // Ensure this is included
//           tickets_total: event.tickets_total,
//           tickets_sold: event.tickets_sold || 0,
//           created_at: new Date().toISOString(), // Placeholder, adjust if backend provides
//           updated_at: new Date().toISOString(), // Placeholder
//           venue: undefined, // Adjust if venue data is included
//         }));
//         setEvents(mappedEvents);
//         const initialQuantities = mappedEvents.reduce((acc, event) => ({
//           ...acc,
//           [event.event_id]: acc[event.event_id] || 1,
//         }), quantities);
//         setQuantities(initialQuantities);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Network error");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEvents();
//   }, [token, quantities]); // Added quantities dependency

//   const filteredEvents = events.filter((event) =>
//     (filters.date ? event.date.includes(filters.date) : true) &&
//     (filters.category ? event.category.toLowerCase().includes(filters.category.toLowerCase()) : true)
//   );

//   const handleBook = async (eventId: number) => {
//     if (!token || !userId) {
//       setError("Authentication or user ID missing");
//       return;
//     }
//     const event = events.find(e => e.event_id === eventId);
//     const qty = quantities[eventId] || 1;
//     if (!event || qty < 1 || qty > event.available_tickets) {
//       setError("Invalid quantity or insufficient tickets");
//       return;
//     }
//     try {
//       const response = await fetch("http://localhost:8081/bookings", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           user_id: userId,
//           event_id: eventId,
//           quantity: qty,
//           total_amount: (event.ticket_price * qty).toFixed(2), // Use ticket_price from Event
//           booking_status: "Pending",
//         }),
//       });
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Booking failed: ${response.status} - ${errorText}`);
//       }
//       const result = await response.json();
//       setError(null);
//       navigate("/user/dashboard/bookings/history");
//       console.log("Booking response:", result);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Network error");
//       console.error("Booking error:", err);
//     }
//   };

//   const handleQuantityChange = (eventId: number, value: number) => {
//     console.log("Updating quantity for event", eventId, "to", value, "Current quantities:", quantities);
//     const event = events.find(e => e.event_id === eventId);
//     const newQuantity = Math.max(1, Math.min(value, (event?.tickets_total || 0) - (event?.tickets_sold || 0)));
//     setQuantities(prev => ({ ...prev, [eventId]: newQuantity }));
//   };

//   return (
//     <div className="events-container">
//       <h2 className="events-title">Events</h2>
//       <div className="events-filters">
//         <input
//           type="date"
//           value={filters.date}
//           onChange={(e) => setFilters({ ...filters, date: e.target.value })}
//           className="events-filter-input"
//         />
//         <input
//           type="text"
//           placeholder="Filter by category"
//           value={filters.category}
//           onChange={(e) => setFilters({ ...filters, category: e.target.value })}
//           className="events-filter-input"
//         />
//       </div>
//       {loading && <p className="events-loading">Loading events...</p>}
//       {error && <p className="events-error">{error}</p>}
//       {filteredEvents.length > 0 ? (
//         <table className="events-table">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Venue ID</th>
//               <th>Date</th>
//               <th>Category</th>
//               <th>Available Tickets</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEvents.map((event) => (
//               <tr key={event.event_id} className="events-table-row">
//                 <td className="events-table-cell">{event.title}</td>
//                 <td className="events-table-cell">{event.venue_id}</td>
//                 <td className="events-table-cell">{new Date(event.date).toLocaleDateString()}</td>
//                 <td className="events-table-cell">{event.category}</td>
//                 <td className="events-table-cell">{event.tickets_total - (event.tickets_sold || 0)}</td>
//                 <td className="events-table-cell">
//                   <input
//                     type="number"
//                     value={quantities[event.event_id] || 1}
//                     onChange={(e) => handleQuantityChange(event.event_id, parseInt(e.target.value) || 1)}
//                     min="1"
//                     max={event.tickets_total - (event.tickets_sold || 0)}
//                     className="quantity-input"
//                   />
//                   <button
//                     className="events-book-button"
//                     onClick={() => handleBook(event.event_id)}
//                   >
//                     Book
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="events-no-events">No events found.</p>
//       )}
//     </div>
//   );
// };

// export default Events;




// import { useState, useEffect } from "react";
// import { useAppSelector } from "../../../app/store";
// import { useNavigate } from "react-router-dom";
// import "../UserDashboard.css";
// import "./Event.css";

// // Match the Event interface from eventSlice.ts
// export interface Event {
//   event_id: number;
//   title: string;
//   description: string;
//   venue_id: number;
//   category: string;
//   date: string;
//   time: string;
//   ticket_price: number; // Added to match backend
//   tickets_total: number;
//   tickets_sold: number;
//   created_at: string;
//   updated_at: string;
//   venue?: {
//     venue_id: number;
//     name: string;
//     address: string;
//     capacity: number;
//     created_at: string;
//   };
// }

// // ApiEvent for raw response (simplified)
// interface ApiEvent {
//   event_id: number;
//   title: string;
//   venue_id: number;
//   category: string;
//   date: string;
//   time: string;
//   ticket_price: number; // Ensure this is in the response
//   tickets_total: number;
//   tickets_sold?: number;
//   description?: string;
// }

// // Updated UserState to handle potential store shape
// interface UserState {
//   token: string | null;
//   user?: { id: number } | null; // Adjusted to match potential Redux shape
// }

// const Events = () => {
//   const userState = useAppSelector((state) => state.user) as unknown as UserState; // Safe cast to avoid type warning
//   const token = userState?.token ?? null;
//   const userId = userState?.user?.id; // Safely access user_id
//   const [events, setEvents] = useState<Event[]>([]);
//   const [filters, setFilters] = useState({ date: "", category: "" });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEvents = async () => {
//       setLoading(true);
//       try {
//         if (!token) {
//           setError("Authentication token is missing");
//           return;
//         }
//         const response = await fetch("http://localhost:8081/events", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!response.ok) throw new Error("Failed to fetch events");
//         const result = await response.json();
//         const mappedEvents = result.map((event: ApiEvent) => ({
//           event_id: event.event_id,
//           title: event.title,
//           description: event.description || "",
//           venue_id: event.venue_id,
//           category: event.category,
//           date: event.date,
//           time: event.time,
//           ticket_price: event.ticket_price,
//           tickets_total: event.tickets_total,
//           tickets_sold: event.tickets_sold || 0,
//           created_at: new Date().toISOString(), // Placeholder, adjust if backend provides
//           updated_at: new Date().toISOString(), // Placeholder
//           venue: undefined, // Adjust if venue data is included
//         }));
//         setEvents(mappedEvents);
//         const initialQuantities = mappedEvents.reduce((acc: { [key: number]: number }, event: Event) => ({
//           ...acc,
//           [event.event_id]: acc[event.event_id] || 1,
//         }), quantities);
//         setQuantities(initialQuantities);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Network error");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEvents();
//   }, [token, quantities]);

//   const filteredEvents = events.filter((event) =>
//     (filters.date ? event.date.includes(filters.date) : true) &&
//     (filters.category ? event.category.toLowerCase().includes(filters.category.toLowerCase()) : true)
//   );

//   const handleBook = async (eventId: number) => {
//     if (!token || !userId) {
//       setError("Authentication or user ID missing");
//       return;
//     }
//     const event = events.find(e => e.event_id === eventId);
//     const qty = quantities[eventId] || 1;
//     if (!event || qty < 1 || qty > (event.tickets_total - (event.tickets_sold || 0))) {
//       setError("Invalid quantity or insufficient tickets");
//       return;
//     }
//     try {
//       const response = await fetch("http://localhost:8081/bookings", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           user_id: userId,
//           event_id: eventId,
//           quantity: qty,
//           total_amount: (event.ticket_price * qty).toFixed(2),
//           booking_status: "Pending",
//         }),
//       });
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Booking failed: ${response.status} - ${errorText}`);
//       }
//       const result = await response.json();
//       setError(null);
//       navigate("/user/dashboard/bookings/history");
//       console.log("Booking response:", result);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Network error");
//       console.error("Booking error:", err);
//     }
//   };

//   const handleQuantityChange = (eventId: number, value: number) => {
//     console.log("Updating quantity for event", eventId, "to", value, "Current quantities:", quantities);
//     const event = events.find(e => e.event_id === eventId);
//     const newQuantity = Math.max(1, Math.min(value, (event?.tickets_total || 0) - (event?.tickets_sold || 0)));
//     setQuantities(prev => ({ ...prev, [eventId]: newQuantity }));
//   };

//   return (
//     <div className="events-container">
//       <h2 className="events-title">Events</h2>
//       <div className="events-filters">
//         <input
//           type="date"
//           value={filters.date}
//           onChange={(e) => setFilters({ ...filters, date: e.target.value })}
//           className="events-filter-input"
//         />
//         <input
//           type="text"
//           placeholder="Filter by category"
//           value={filters.category}
//           onChange={(e) => setFilters({ ...filters, category: e.target.value })}
//           className="events-filter-input"
//         />
//       </div>
//       {loading && <p className="events-loading">Loading events...</p>}
//       {error && <p className="events-error">{error}</p>}
//       {filteredEvents.length > 0 ? (
//         <table className="events-table">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Venue ID</th>
//               <th>Date</th>
//               <th>Category</th>
//               <th>Available Tickets</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEvents.map((event) => (
//               <tr key={event.event_id} className="events-table-row">
//                 <td className="events-table-cell">{event.title}</td>
//                 <td className="events-table-cell">{event.venue_id}</td>
//                 <td className="events-table-cell">{new Date(event.date).toLocaleDateString()}</td>
//                 <td className="events-table-cell">{event.category}</td>
//                 <td className="events-table-cell">{event.tickets_total - (event.tickets_sold || 0)}</td>
//                 <td className="events-table-cell">
//                   <input
//                     type="number"
//                     value={quantities[event.event_id] || 1}
//                     onChange={(e) => handleQuantityChange(event.event_id, parseInt(e.target.value) || 1)}
//                     min="1"
//                     max={event.tickets_total - (event.tickets_sold || 0)}
//                     className="quantity-input"
//                   />
//                   <button
//                     className="events-book-button"
//                     onClick={() => handleBook(event.event_id)}
//                   >
//                     Book
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="events-no-events">No events found.</p>
//       )}
//     </div>
//   );
// };

// export default Events;





import { useState, useEffect } from "react";
import { useAppSelector } from "../../../app/store";
import { useNavigate } from "react-router-dom";
import "../UserDashboard.css";
import "./Event.css";

// Match the Event interface from eventSlice.ts
export interface Event {
  event_id: number;
  title: string;
  description: string;
  venue_id: number;
  category: string;
  date: string;
  time: string;
  ticket_price: number;
  tickets_total: number;
  tickets_sold: number;
  created_at: string;
  updated_at: string;
  venue?: {
    venue_id: number;
    name: string;
    address: string;
    capacity: number;
    created_at: string;
  };
}

// ApiEvent for raw response (simplified)
interface ApiEvent {
  event_id: number;
  title: string;
  venue_id: number;
  category: string;
  date: string;
  time: string;
  ticket_price: number;
  tickets_total: number;
  tickets_sold?: number;
  description?: string;
}

// Updated UserState to handle potential store shape
interface UserState {
  token: string | null;
  user?: { id: number } | null; // Adjusted to match potential Redux shape
}

const Events = () => {
  const userState = useAppSelector((state) => state.user) as unknown as UserState;
  const token = userState?.token ?? null;
  const userId = userState?.user?.id; // May be undefined
  const [events, setEvents] = useState<Event[]>([]);
  const [filters, setFilters] = useState({ date: "", category: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({}); // Initialize outside effect
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        if (!token) {
          setError("Authentication token is missing");
          return;
        }
        const response = await fetch("http://localhost:8081/events", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch events");
        const result = await response.json();
        const mappedEvents = result.map((event: ApiEvent) => ({
          event_id: event.event_id,
          title: event.title,
          description: event.description || "",
          venue_id: event.venue_id,
          category: event.category,
          date: event.date,
          time: event.time,
          ticket_price: event.ticket_price,
          tickets_total: event.tickets_total,
          tickets_sold: event.tickets_sold || 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          venue: undefined,
        }));
        setEvents(mappedEvents);
        // Initialize quantities after events are set
        const initialQuantities = mappedEvents.reduce((acc: { [key: number]: number }, event: Event) => ({
          ...acc,
          [event.event_id]: acc[event.event_id] || 1,
        }), {});
        setQuantities(initialQuantities);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Network error");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [token]); // Removed quantities to prevent re-render loop

  const filteredEvents = events.filter((event) =>
    (filters.date ? event.date.includes(filters.date) : true) &&
    (filters.category ? event.category.toLowerCase().includes(filters.category.toLowerCase()) : true)
  );

  const handleBook = async (eventId: number) => {
    if (!token || !userId) {
      setError(`Authentication or user ID missing. User ID: ${userId}, Token: ${token ? "present" : "missing"}`);
      console.log("UserState:", userState); // Debug user state
      return;
    }
    const event = events.find(e => e.event_id === eventId);
    const qty = quantities[eventId] || 1;
    if (!event || qty < 1 || qty > (event.tickets_total - (event.tickets_sold || 0))) {
      setError("Invalid quantity or insufficient tickets");
      return;
    }
    try {
      const response = await fetch("http://localhost:8081/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userId,
          event_id: eventId,
          quantity: qty,
          total_amount: (event.ticket_price * qty).toFixed(2),
          booking_status: "Pending",
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Booking failed: ${response.status} - ${errorText}`);
      }
      const result = await response.json();
      setError(null);
      navigate("/user/dashboard/bookings/history");
      console.log("Booking response:", result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
      console.error("Booking error:", err);
    }
  };

  const handleQuantityChange = (eventId: number, value: number) => {
    console.log("Updating quantity for event", eventId, "to", value, "Current quantities:", quantities);
    const event = events.find(e => e.event_id === eventId);
    const newQuantity = Math.max(1, Math.min(value, (event?.tickets_total || 0) - (event?.tickets_sold || 0)));
    setQuantities(prev => ({ ...prev, [eventId]: newQuantity }));
  };

  return (
    <div className="events-container">
      <h2 className="events-title">Events</h2>
      <div className="events-filters">
        <input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          className="events-filter-input"
        />
        <input
          type="text"
          placeholder="Filter by category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="events-filter-input"
        />
      </div>
      {loading && <p className="events-loading">Loading events...</p>}
      {error && <p className="events-error">{error}</p>}
      {filteredEvents.length > 0 ? (
        <table className="events-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Venue ID</th>
              <th>Date</th>
              <th>Category</th>
              <th>Available Tickets</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event) => (
              <tr key={event.event_id} className="events-table-row">
                <td className="events-table-cell">{event.title}</td>
                <td className="events-table-cell">{event.venue_id}</td>
                <td className="events-table-cell">{new Date(event.date).toLocaleDateString()}</td>
                <td className="events-table-cell">{event.category}</td>
                <td className="events-table-cell">{event.tickets_total - (event.tickets_sold || 0)}</td>
                <td className="events-table-cell">
                  <input
                    type="number"
                    value={quantities[event.event_id] || 1}
                    onChange={(e) => handleQuantityChange(event.event_id, parseInt(e.target.value) || 1)}
                    min="1"
                    max={event.tickets_total - (event.tickets_sold || 0)}
                    className="quantity-input"
                  />
                  <button
                    className="events-book-button"
                    onClick={() => handleBook(event.event_id)}
                  >
                    Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="events-no-events">No events found.</p>
      )}
    </div>
  );
};

export default Events;
// // src/dashboard/AdminDashboard/ManageSupportTickets/ManageSupportTickets.tsx
// import React, { useEffect, useState } from 'react';
// import { useAppSelector, useAppDispatch } from '../../../app/store';
// import { setLoading, setSupportTickets, setError, deleteSupportTicket } from '../../../features/supportTickets/supportTicketSlice';
// import { FaEdit } from 'react-icons/fa';
// import { FaTrash } from 'react-icons/fa';
// import './ManageSupportTickets.css';

// // Define PublicUser interface based on auth.service.ts
// interface PublicUser {
//   user_id: number;
//   email: string | null;
//   name: string;
//   role: "user" | "admin" | null;
// }

// // Assume SupportTicket interface (adjust based on schema)
// interface SupportTicket {
//   ticket_id: number;
//   user_id: number;
//   title: string;
//   description: string;
//   status: string;
//   created_at: string;
// }

// const ManageSupportTickets = () => {
//   const { supportTickets, loading, error } = useAppSelector((state) => state.supportTickets);
//   const dispatch = useAppDispatch();
//   const { token, user } = useAppSelector((state) => state.user) as { token: string | null; user: PublicUser | null };
//   const role = user?.role;
//   const userId = user?.user_id;

//   const [creating, setCreating] = useState(false);
//   const [newTicket, setNewTicket] = useState({
//     user_id: '',
//     title: '',
//     description: '',
//     status: 'open', // Default status
//   });

//   useEffect(() => {
//     const fetchSupportTickets = async () => {
//       if (!userId || !token) return;
//       dispatch(setLoading());
//       try {
//         const url = role === 'admin' ? 'http://localhost:8081/support-tickets' : `http://localhost:8081/support-tickets?userId=${userId}`;
//         const response = await fetch(url, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch support tickets');
//         }
//         const result = await response.json();
//         dispatch(setSupportTickets(result));
//       } catch (err: unknown) {
//         let message = 'Network error occurred';
//         if (err instanceof Error) {
//           message = err.message;
//         }
//         dispatch(setError(message));
//       }
//     };
//     fetchSupportTickets();
//   }, [dispatch, token, role, userId]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setNewTicket((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleCreate = async () => {
//     if (!userId) return;
//     const payload = {
//       user_id: parseInt(userId, 10), // Use logged-in user_id
//       title: newTicket.title,
//       description: newTicket.description,
//       status: newTicket.status,
//     };
//     dispatch(setLoading());
//     try {
//       const response = await fetch('http://localhost:8081/support-tickets', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });
//       if (!response.ok) throw new Error('Create failed');
//       const result = await response.json();
//       dispatch(setSupportTickets([...supportTickets, result]));
//       setCreating(false);
//       setNewTicket({
//         user_id: '',
//         title: '',
//         description: '',
//         status: 'open',
//       });
//     } catch (err: unknown) {
//       let message = 'Network error occurred';
//       if (err instanceof Error) {
//         message = err.message;
//       }
//       dispatch(setError(message));
//     }
//   };

//   const handleDelete = async (ticketId: number) => {
//     if (window.confirm('Are you sure you want to delete this ticket?')) {
//       dispatch(setLoading());
//       try {
//         const response = await fetch(`http://localhost:8081/support-tickets/${ticketId}`, {
//           method: 'DELETE',
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!response.ok) throw new Error('Delete failed');
//         await response.json();
//         dispatch(deleteSupportTicket(ticketId));
//       } catch (err: unknown) {
//         let message = 'Network error occurred';
//         if (err instanceof Error) {
//           message = err.message;
//         }
//         dispatch(setError(message));
//       }
//     }
//   };

//   const handleCancel = () => {
//     setCreating(false);
//     setNewTicket({
//       user_id: '',
//       title: '',
//       description: '',
//       status: 'open',
//     });
//   };

//   if (loading) return <div className="loading">Loading...</div>;
//   if (error) return <div className="error-message">{error}</div>;

//   return (
//     <div className="manage-support-tickets">
//       <h2 className="support-tickets-title">Manage Support Tickets</h2>
//       <button className="create-btn" onClick={() => setCreating(true)}>Create Support Ticket</button>
//       <table className="support-tickets-table">
//         <thead>
//           <tr>
//             <th>Ticket ID</th>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Status</th>
//             <th>Created At</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {creating && (
//             <tr className="support-ticket-row">
//               <td></td> {/* Ticket ID auto-generated by backend */}
//               <td><input type="text" name="title" value={newTicket.title} onChange={handleInputChange} placeholder="Title" className="form-input" /></td>
//               <td><textarea name="description" value={newTicket.description} onChange={handleInputChange} placeholder="Description" className="form-input" /></td>
//               <td><input type="text" name="status" value={newTicket.status} onChange={handleInputChange} placeholder="Status" className="form-input" /></td>
//               <td></td> {/* Created At auto-generated by backend */}
//               <td>
//                 <button className="save-btn" onClick={handleCreate}><FaEdit /></button>
//                 <button className="cancel-btn" onClick={handleCancel}><FaTrash /></button>
//               </td>
//             </tr>
//           )}
//           {supportTickets.map((ticket) => (
//             <tr key={ticket.ticket_id} className="support-ticket-row">
//               <td>{ticket.ticket_id}</td>
//               <td>{ticket.title}</td>
//               <td>{ticket.description}</td>
//               <td>{ticket.status}</td>
//               <td>{ticket.created_at}</td>
//               <td>
//                 <button className="delete-btn" onClick={() => handleDelete(ticket.ticket_id)}><FaTrash /></button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManageSupportTickets;










// // src/dashboard/AdminDashboard/ManageSupportTickets/ManageSupportTickets.tsx
// import React, { useEffect, useState } from 'react';
// import { useAppSelector, useAppDispatch } from '../../../app/store';
// import { setLoading, setSupportTickets, setError, deleteSupportTicket } from '../../../features/supportTickets/supportTicketSlice';
// import { FaEdit } from 'react-icons/fa';
// import { FaTrash } from 'react-icons/fa';
// import './ManageSupportTickets.css';

// // Define PublicUser interface based on auth.service.ts
// interface PublicUser {
//   user_id: number;
//   email: string | null;
//   name: string;
//   role: "user" | "admin" | null;
// }

// // Define SupportTicket interface
// interface SupportTicket {
//   ticket_id: number;
//   user_id: number;
//   title: string;
//   description: string;
//   status: string;
//   created_at: string;
// }

// const ManageSupportTickets = () => {
//   const { supportTickets, loading, error } = useAppSelector((state) => state.supportTickets) as { supportTickets: SupportTicket[]; loading: boolean; error: string | null };
//   const dispatch = useAppDispatch();
//   const { token, user } = useAppSelector((state) => state.user) as { token: string | null; user: PublicUser | null };
//   const role = user?.role;
//   const userId = user?.user_id;

//   const [creating, setCreating] = useState(false);
//   const [newTicket, setNewTicket] = useState({
//     user_id: '',
//     title: '',
//     description: '',
//     status: 'open', // Default status
//   });

//   useEffect(() => {
//     const fetchSupportTickets = async () => {
//       if (!userId || !token) return;
//       dispatch(setLoading());
//       try {
//         const url = role === 'admin' ? 'http://localhost:8081/support-tickets' : `http://localhost:8081/support-tickets?userId=${userId}`;
//         const response = await fetch(url, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch support tickets');
//         }
//         const result = await response.json();
//         dispatch(setSupportTickets(result));
//       } catch (err: unknown) {
//         let message = 'Network error occurred';
//         if (err instanceof Error) {
//           message = err.message;
//         }
//         dispatch(setError(message));
//       }
//     };
//     fetchSupportTickets();
//   }, [dispatch, token, role, userId]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setNewTicket((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleCreate = async () => {
//     if (!userId) return;
//     const payload = {
//       user_id: parseInt(userId.toString(), 10), // Ensure number
//       title: newTicket.title,
//       description: newTicket.description,
//       status: newTicket.status,
//     };
//     dispatch(setLoading());
//     try {
//       const response = await fetch('http://localhost:8081/support-tickets', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });
//       if (!response.ok) throw new Error('Create failed');
//       const result = await response.json();
//       dispatch(setSupportTickets([...supportTickets, result]));
//       setCreating(false);
//       setNewTicket({
//         user_id: '',
//         title: '',
//         description: '',
//         status: 'open',
//       });
//     } catch (err: unknown) {
//       let message = 'Network error occurred';
//       if (err instanceof Error) {
//         message = err.message;
//       }
//       dispatch(setError(message));
//     }
//   };

//   const handleDelete = async (ticketId: number) => {
//     if (window.confirm('Are you sure you want to delete this ticket?')) {
//       dispatch(setLoading());
//       try {
//         const response = await fetch(`http://localhost:8081/support-tickets/${ticketId}`, { // Ensure number in URL
//           method: 'DELETE',
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!response.ok) throw new Error('Delete failed');
//         await response.json();
//         dispatch(deleteSupportTicket(ticketId));
//       } catch (err: unknown) {
//         let message = 'Network error occurred';
//         if (err instanceof Error) {
//           message = err.message;
//         }
//         dispatch(setError(message));
//       }
//     }
//   };

//   const handleCancel = () => {
//     setCreating(false);
//     setNewTicket({
//       user_id: '',
//       title: '',
//       description: '',
//       status: 'open',
//     });
//   };

//   if (loading) return <div className="loading">Loading...</div>;
//   if (error) return <div className="error-message">{error}</div>;

//   return (
//     <div className="manage-support-tickets">
//       <h2 className="support-tickets-title">Manage Support Tickets</h2>
//       <button className="create-btn" onClick={() => setCreating(true)}>Create Support Ticket</button>
//       <table className="support-tickets-table">
//         <thead>
//           <tr>
//             <th>Ticket ID</th>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Status</th>
//             <th>Created At</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {creating && (
//             <tr className="support-ticket-row">
//               <td></td> {/* Ticket ID auto-generated by backend */}
//               <td><input type="text" name="title" value={newTicket.title} onChange={handleInputChange} placeholder="Title" className="form-input" /></td>
//               <td><textarea name="description" value={newTicket.description} onChange={handleInputChange} placeholder="Description" className="form-input" /></td>
//               <td><input type="text" name="status" value={newTicket.status} onChange={handleInputChange} placeholder="Status" className="form-input" /></td>
//               <td></td> {/* Created At auto-generated by backend */}
//               <td>
//                 <button className="save-btn" onClick={handleCreate}><FaEdit /></button>
//                 <button className="cancel-btn" onClick={handleCancel}><FaTrash /></button>
//               </td>
//             </tr>
//           )}
//           {supportTickets.map((ticket) => (
//             <tr key={ticket.ticket_id} className="support-ticket-row">
//               <td>{ticket.ticket_id}</td>
//               <td>{ticket.title}</td>
//               <td>{ticket.description}</td>
//               <td>{ticket.status}</td>
//               <td>{ticket.created_at}</td>
//               <td>
//                 <button className="delete-btn" onClick={() => handleDelete(ticket.ticket_id)}><FaTrash /></button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManageSupportTickets;








// // src/dashboard/AdminDashboard/ManageSupportTickets/ManageSupportTickets.tsx
// import React, { useEffect, useState } from 'react';
// import { useAppSelector, useAppDispatch } from '../../../app/store';
// import { setLoading, setSupportTickets, setError, deleteSupportTicket } from '../../../features/supportTickets/supportTicketSlice';
// import { FaEdit } from 'react-icons/fa';
// import { FaTrash } from 'react-icons/fa';
// import './ManageSupportTickets.css';

// // Define PublicUser interface based on auth.service.ts
// interface PublicUser {
//   user_id: number;
//   email: string | null;
//   name: string;
//   role: "user" | "admin" | null;
// }

// // Define SupportTicket interface
// interface SupportTicket {
//   ticket_id: number;
//   user_id: number;
//   title: string;
//   description: string;
//   status: string;
//   created_at: string;
// }

// const ManageSupportTickets = () => {
//   const { supportTickets, loading, error } = useAppSelector((state) => state.supportTickets);
//   const dispatch = useAppDispatch();
//   const { token, user } = useAppSelector((state) => state.user) as { token: string | null; user: PublicUser | null };
//   const role = user?.role;
//   const userId = user?.user_id;

//   const [creating, setCreating] = useState(false);
//   const [newTicket, setNewTicket] = useState({
//     user_id: '',
//     title: '',
//     description: '',
//     status: 'open', // Default status
//   });

//   useEffect(() => {
//     const fetchSupportTickets = async () => {
//       if (!userId || !token) return;
//       dispatch(setLoading());
//       try {
//         const url = role === 'admin' ? 'http://localhost:8081/support-tickets' : `http://localhost:8081/support-tickets?userId=${userId}`;
//         const response = await fetch(url, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch support tickets');
//         }
//         const result = await response.json();
//         dispatch(setSupportTickets(result));
//       } catch (err: unknown) {
//         let message = 'Network error occurred';
//         if (err instanceof Error) {
//           message = err.message;
//         }
//         dispatch(setError(message));
//       }
//     };
//     fetchSupportTickets();
//   }, [dispatch, token, role, userId]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setNewTicket((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleCreate = async () => {
//     if (!userId) return;
//     const payload = {
//       user_id: parseInt(userId.toString(), 10),
//       title: newTicket.title,
//       description: newTicket.description,
//       status: newTicket.status,
//     };
//     dispatch(setLoading());
//     try {
//       const response = await fetch('http://localhost:8081/support-tickets', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });
//       if (!response.ok) throw new Error('Create failed');
//       const result = await response.json();
//       dispatch(setSupportTickets([...supportTickets, result]));
//       setCreating(false);
//       setNewTicket({
//         user_id: '',
//         title: '',
//         description: '',
//         status: 'open',
//       });
//     } catch (err: unknown) {
//       let message = 'Network error occurred';
//       if (err instanceof Error) {
//         message = err.message;
//       }
//       dispatch(setError(message));
//     }
//   };

//   const handleDelete = async (ticketId: number) => {
//     if (window.confirm('Are you sure you want to delete this ticket?')) {
//       dispatch(setLoading());
//       try {
//         const response = await fetch(`http://localhost:8081/support-tickets/${ticketId}`, {
//           method: 'DELETE',
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!response.ok) throw new Error('Delete failed');
//         await response.json();
//         dispatch(deleteSupportTicket(ticketId));
//       } catch (err: unknown) {
//         let message = 'Network error occurred';
//         if (err instanceof Error) {
//           message = err.message;
//         }
//         dispatch(setError(message));
//       }
//     }
//   };

//   const handleCancel = () => {
//     setCreating(false);
//     setNewTicket({
//       user_id: '',
//       title: '',
//       description: '',
//       status: 'open',
//     });
//   };

//   if (loading) return <div className="loading">Loading...</div>;
//   if (error) return <div className="error-message">{error}</div>;

//   return (
//     <div className="manage-support-tickets">
//       <h2 className="support-tickets-title">Manage Support Tickets</h2>
//       <button className="create-btn" onClick={() => setCreating(true)}>Create Support Ticket</button>
//       <table className="support-tickets-table">
//         <thead>
//           <tr>
//             <th>Ticket ID</th>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Status</th>
//             <th>Created At</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {creating && (
//             <tr className="support-ticket-row">
//               <td></td> {/* Ticket ID auto-generated by backend */}
//               <td><input type="text" name="title" value={newTicket.title} onChange={handleInputChange} placeholder="Title" className="form-input" /></td>
//               <td><textarea name="description" value={newTicket.description} onChange={handleInputChange} placeholder="Description" className="form-input" /></td>
//               <td><input type="text" name="status" value={newTicket.status} onChange={handleInputChange} placeholder="Status" className="form-input" /></td>
//               <td></td> {/* Created At auto-generated by backend */}
//               <td>
//                 <button className="save-btn" onClick={handleCreate}><FaEdit /></button>
//                 <button className="cancel-btn" onClick={handleCancel}><FaTrash /></button>
//               </td>
//             </tr>
//           )}
//           {supportTickets.map((ticket) => (
//             <tr key={ticket.ticket_id} className="support-ticket-row">
//               <td>{ticket.ticket_id}</td>
//               <td>{ticket.title}</td>
//               <td>{ticket.description}</td>
//               <td>{ticket.status}</td>
//               <td>{ticket.created_at}</td>
//               <td>
//                 <button className="delete-btn" onClick={() => handleDelete(ticket.ticket_id)}><FaTrash /></button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManageSupportTickets;











// src/dashboard/AdminDashboard/ManageSupportTickets/ManageSupportTickets.tsx
import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/store';
import { setLoading, setSupportTickets, setError, deleteSupportTicket } from '../../../features/supportTickets/supportTicketSlice';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import './ManageSupportTickets.css';

// Define PublicUser interface based on auth.service.ts
interface PublicUser {
  user_id: number;
  email: string | null;
  name: string;
  role: "user" | "admin" | null;
}

// Define SupportTicket interface and export it to avoid "unused" warning
export interface SupportTicket {
  ticket_id: number;
  user_id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
}

const ManageSupportTickets = () => {
  const { supportTickets, loading, error } = useAppSelector((state) => state.supportTickets);
  const dispatch = useAppDispatch();
  const { token, user } = useAppSelector((state) => state.user) as { token: string | null; user: PublicUser | null };
  const role = user?.role;
  const userId = user?.user_id;

  const [creating, setCreating] = useState(false);
  const [newTicket, setNewTicket] = useState({
    user_id: '',
    title: '',
    description: '',
    status: 'open', // Default status
  });

  useEffect(() => {
    const fetchSupportTickets = async () => {
      if (!userId || !token) return;
      dispatch(setLoading());
      try {
        const url = role === 'admin' ? 'http://localhost:8081/Tickets' : `http://localhost:8081/Tickets?userId=${userId}`;
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch support tickets');
        }
        const result = await response.json();
        dispatch(setSupportTickets(result));
      } catch (err: unknown) {
        let message = 'Network error occurred';
        if (err instanceof Error) {
          message = err.message;
        }
        dispatch(setError(message));
      }
    };
    fetchSupportTickets();
  }, [dispatch, token, role, userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTicket((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    if (!userId) return;
    const payload = {
      user_id: parseInt(userId.toString(), 10),
      title: newTicket.title,
      description: newTicket.description,
      status: newTicket.status,
    };
    dispatch(setLoading());
    try {
      const response = await fetch('http://localhost:8081/support-tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Create failed');
      const result = await response.json();
      dispatch(setSupportTickets([...supportTickets, result]));
      setCreating(false);
      setNewTicket({
        user_id: '',
        title: '',
        description: '',
        status: 'open',
      });
    } catch (err: unknown) {
      let message = 'Network error occurred';
      if (err instanceof Error) {
        message = err.message;
      }
      dispatch(setError(message));
    }
  };

  const handleDelete = async (ticketId: number) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      dispatch(setLoading());
      try {
        const response = await fetch(`http://localhost:8081/support-tickets/${ticketId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Delete failed');
        await response.json();
        dispatch(deleteSupportTicket(ticketId));
      } catch (err: unknown) {
        let message = 'Network error occurred';
        if (err instanceof Error) {
          message = err.message;
        }
        dispatch(setError(message));
      }
    }
  };

  const handleCancel = () => {
    setCreating(false);
    setNewTicket({
      user_id: '',
      title: '',
      description: '',
      status: 'open',
    });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="manage-support-tickets">
      <h2 className="support-tickets-title">Manage Support Tickets</h2>
      <button className="create-btn" onClick={() => setCreating(true)}>Create Support Ticket</button>
      <table className="support-tickets-table">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {creating && (
            <tr className="support-ticket-row">
              <td></td> {/* Ticket ID auto-generated by backend */}
              <td><input type="text" name="title" value={newTicket.title} onChange={handleInputChange} placeholder="Title" className="form-input" /></td>
              <td><textarea name="description" value={newTicket.description} onChange={handleInputChange} placeholder="Description" className="form-input" /></td>
              <td><input type="text" name="status" value={newTicket.status} onChange={handleInputChange} placeholder="Status" className="form-input" /></td>
              <td></td> {/* Created At auto-generated by backend */}
              <td>
                <button className="save-btn" onClick={handleCreate}><FaEdit /></button>
                <button className="cancel-btn" onClick={handleCancel}><FaTrash /></button>
              </td>
            </tr>
          )}
          {supportTickets.map((ticket: SupportTicket) => ( // Explicitly type the parameter
            <tr key={ticket.ticket_id} className="support-ticket-row">
              <td>{ticket.ticket_id}</td>
              <td>{ticket.title}</td>
              <td>{ticket.description}</td>
              <td>{ticket.status}</td>
              <td>{ticket.created_at}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(ticket.ticket_id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageSupportTickets;
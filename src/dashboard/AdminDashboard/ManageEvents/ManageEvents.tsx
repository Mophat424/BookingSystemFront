// // src/dashboard/AdminDashboard/ManageEvents/ManageEvents.tsx
// import React, { useEffect, useState } from 'react';
// import { useAppSelector, useAppDispatch } from '../../../app/store';
// import { setLoading, setEvents, setError, updateEvent, deleteEvent } from '../../../features/events/eventSlice';
// import { FaEdit } from 'react-icons/fa';
// import { FaTrash as FaTrashIcon } from 'react-icons/fa';

// import './ManageEvents.css';

// const ManageEvents = () => {
//   const { events, loading, error } = useAppSelector((state) => state.events);
//   const dispatch = useAppDispatch();
//   const token = useAppSelector((state) => state.user.token);

//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [creating, setCreating] = useState(false);
//   const [editedEvent, setEditedEvent] = useState({
//     event_id: 0,
//     title: '',
//     description: '',
//     venue_id: '',
//     category: '',
//     date: '',
//     time: '',
//     ticket_price: '',
//     tickets_total: '',
//     tickets_sold: '',
//   });
//   const [newEvent, setNewEvent] = useState({
//     title: '',
//     description: '',
//     venue_id: '',
//     category: '',
//     date: '',
//     time: '',
//     ticket_price: '',
//     tickets_total: '',
//     tickets_sold: '',
//   });

//   useEffect(() => {
//     const fetchEvents = async () => {
//       dispatch(setLoading());
//       try {
//         const response = await fetch('http://localhost:8081/Events');
//         if (!response.ok) {
//           throw new Error('Failed to fetch events');
//         }
//         const result = await response.json();
//         dispatch(setEvents(result)); // Treat response as raw array
//       } catch (err: unknown) {
//         let message = 'Network error occurred';
//         if (err instanceof Error) {
//           message = err.message;
//         }
//         dispatch(setError(message));
//       }
//     };
//     fetchEvents();
//   }, [dispatch]);

//   const handleEditClick = (eventId: number) => {
//     const event = events.find((e) => e.event_id === eventId);
//     if (event) {
//       setEditingId(eventId);
//       setEditedEvent({
//         event_id: event.event_id,
//         title: event.title,
//         description: event.description,
//         venue_id: event.venue_id.toString(),
//         category: event.category,
//         date: event.date,
//         time: event.time,
//         ticket_price: event.ticket_price.toString(),
//         tickets_total: event.tickets_total.toString(),
//         tickets_sold: event.tickets_sold.toString(),
//       });
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, isNew: boolean = false) => {
//     const { name, value } = e.target;
//     if (isNew) {
//       setNewEvent((prev) => ({
//         ...prev,
//         [name]: name === 'ticket_price' ? parseFloat(value).toString() : value,
//       }));
//     } else {
//       setEditedEvent((prev) => ({
//         ...prev,
//         [name]: name === 'ticket_price' ? parseFloat(value).toString() : value,
//       }));
//     }
//   };

//   const handleSave = async () => {
//     if (editingId !== null) {
//       const payload = {
//         event_id: editingId,
//         title: editedEvent.title,
//         description: editedEvent.description,
//         venue_id: parseInt(editedEvent.venue_id, 10),
//         category: editedEvent.category,
//         date: editedEvent.date,
//         time: editedEvent.time,
//         ticket_price: parseFloat(editedEvent.ticket_price),
//         tickets_total: parseInt(editedEvent.tickets_total, 10),
//         tickets_sold: parseInt(editedEvent.tickets_sold, 10),
//       };
//       dispatch(setLoading());
//       try {
//         const response = await fetch(`http://localhost:8081/Events/${editingId}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(payload),
//         });
//         if (!response.ok) throw new Error('Update failed');
//         await response.json();
//         dispatch(updateEvent(payload));
//         setEditingId(null);
//       } catch (err: unknown) {
//         let message = 'Network error occurred';
//         if (err instanceof Error) {
//           message = err.message;
//         }
//         dispatch(setError(message));
//       }
//     }
//   };

//   const handleCreate = async () => {
//     const payload = {
//       title: newEvent.title,
//       description: newEvent.description,
//       venue_id: parseInt(newEvent.venue_id, 10),
//       category: newEvent.category,
//       date: newEvent.date,
//       time: newEvent.time,
//       ticket_price: parseFloat(newEvent.ticket_price),
//       tickets_total: parseInt(newEvent.tickets_total, 10),
//       tickets_sold: parseInt(newEvent.tickets_sold, 10),
//     };
//     dispatch(setLoading());
//     try {
//       const response = await fetch('http://localhost:8081/Events', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });
//       if (!response.ok) throw new Error('Create failed');
//       const result = await response.json();
//       dispatch(setEvents([...events, result])); // Add new event to state
//       setCreating(false);
//       setNewEvent({
//         title: '',
//         description: '',
//         venue_id: '',
//         category: '',
//         date: '',
//         time: '',
//         ticket_price: '',
//         tickets_total: '',
//         tickets_sold: '',
//       });
//     } catch (err: unknown) {
//       let message = 'Network error occurred';
//       if (err instanceof Error) {
//         message = err.message;
//       }
//       dispatch(setError(message));
//     }
//   };

//   const handleDelete = async (eventId: number) => {
//     if (window.confirm('Are you sure you want to delete this event?')) {
//       dispatch(setLoading());
//       try {
//         const response = await fetch(`http://localhost:8081/Events/${eventId}`, {
//           method: 'DELETE',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (!response.ok) throw new Error('Delete failed');
//         await response.json();
//         dispatch(deleteEvent(eventId));
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
//     setEditingId(null);
//     setCreating(false);
//     setNewEvent({
//       title: '',
//       description: '',
//       venue_id: '',
//       category: '',
//       date: '',
//       time: '',
//       ticket_price: '',
//       tickets_total: '',
//       tickets_sold: '',
//     });
//   };

//   if (loading) return <div className="loading">Loading...</div>;
//   if (error) return <div className="error-message">{error}</div>;

//   return (
//     <div className="manage-events">
//       <h2 className="events-title">Manage Events</h2>
//       <button className="create-btn" onClick={() => setCreating(true)}>Create Event</button>
//       <table className="events-table">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Venue ID</th>
//             <th>Category</th>
//             <th>Date</th>
//             <th>Time</th>
//             <th>Ticket Price</th>
//             <th>Total Tickets</th>
//             <th>Sold Tickets</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {creating && (
//             <tr className="event-row">
//               <td><input type="text" name="title" value={newEvent.title} onChange={(e) => handleInputChange(e, true)} placeholder="Title" className="form-input" /></td>
//               <td><textarea name="description" value={newEvent.description} onChange={(e) => handleInputChange(e, true)} placeholder="Description" className="form-input" /></td>
//               <td><input type="number" name="venue_id" value={newEvent.venue_id} onChange={(e) => handleInputChange(e, true)} placeholder="Venue ID" className="form-input" /></td>
//               <td><input type="text" name="category" value={newEvent.category} onChange={(e) => handleInputChange(e, true)} placeholder="Category" className="form-input" /></td>
//               <td><input type="date" name="date" value={newEvent.date} onChange={(e) => handleInputChange(e, true)} className="form-input" /></td>
//               <td><input type="time" name="time" value={newEvent.time} onChange={(e) => handleInputChange(e, true)} className="form-input" /></td>
//               <td><input type="number" step="0.01" name="ticket_price" value={newEvent.ticket_price} onChange={(e) => handleInputChange(e, true)} placeholder="Ticket Price" className="form-input" /></td>
//               <td><input type="number" name="tickets_total" value={newEvent.tickets_total} onChange={(e) => handleInputChange(e, true)} placeholder="Total Tickets" className="form-input" /></td>
//               <td><input type="number" name="tickets_sold" value={newEvent.tickets_sold} onChange={(e) => handleInputChange(e, true)} placeholder="Tickets Sold" className="form-input" /></td>
//               <td>
//                 <button className="save-btn" onClick={handleCreate}><FaEdit /></button>
//                 <button className="cancel-btn" onClick={handleCancel}><FaTrashIcon /></button>
//               </td>
//             </tr>
//           )}
//           {events.map((event) => (
//             <tr key={event.event_id} className="event-row">
//               {editingId === event.event_id ? (
//                 <>
//                   <td><input type="text" name="title" value={editedEvent.title} onChange={handleInputChange} className="form-input" /></td>
//                   <td><textarea name="description" value={editedEvent.description} onChange={handleInputChange} className="form-input" /></td>
//                   <td><input type="number" name="venue_id" value={editedEvent.venue_id} onChange={handleInputChange} className="form-input" /></td>
//                   <td><input type="text" name="category" value={editedEvent.category} onChange={handleInputChange} className="form-input" /></td>
//                   <td><input type="date" name="date" value={editedEvent.date} onChange={handleInputChange} className="form-input" /></td>
//                   <td><input type="time" name="time" value={editedEvent.time} onChange={handleInputChange} className="form-input" /></td>
//                   <td><input type="number" step="0.01" name="ticket_price" value={editedEvent.ticket_price} onChange={handleInputChange} className="form-input" /></td>
//                   <td><input type="number" name="tickets_total" value={editedEvent.tickets_total} onChange={handleInputChange} className="form-input" /></td>
//                   <td><input type="number" name="tickets_sold" value={editedEvent.tickets_sold} onChange={handleInputChange} className="form-input" /></td>
//                   <td>
//                     <button className="save-btn" onClick={handleSave}><FaEdit /></button>
//                     <button className="cancel-btn" onClick={handleCancel}><FaTrashIcon /></button>
//                   </td>
//                 </>
//               ) : (
//                 <>
//                   <td>{event.title}</td>
//                   <td>{event.description}</td>
//                   <td>{event.venue_id}</td>
//                   <td>{event.category}</td>
//                   <td>{event.date}</td>
//                   <td>{event.time}</td>
//                   <td>${event.ticket_price}</td>
//                   <td>{event.tickets_total}</td>
//                   <td>{event.tickets_sold}</td>
//                   <td>
//                     <button className="edit-btn" onClick={() => handleEditClick(event.event_id)}><FaEdit /></button>
//                     <button className="delete-btn" onClick={() => handleDelete(event.event_id)}><FaTrashIcon /></button>
//                   </td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManageEvents;









import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/store';
import { setLoading, setEvents, setError, updateEvent, deleteEvent } from '../../../features/events/eventSlice';
import { FaEdit } from 'react-icons/fa';
import { FaTrash as FaTrashIcon } from 'react-icons/fa';
import './ManageEvents.css';

const ManageEvents = () => {
  const { events, loading, error } = useAppSelector((state) => state.events);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [editedEvent, setEditedEvent] = useState({
    event_id: 0,
    title: '',
    description: '',
    venue_id: '',
    category: '',
    date: '',
    time: '',
    ticket_price: '',
    tickets_total: '',
    tickets_sold: '',
  });
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    venue_id: '',
    category: '',
    date: '',
    time: '',
    ticket_price: '',
    tickets_total: '',
    tickets_sold: '',
  });

  useEffect(() => {
    const fetchEvents = async () => {
      dispatch(setLoading());
      try {
        const response = await fetch('http://localhost:8081/Events');
        if (!response.ok) throw new Error('Failed to fetch events');
        const result = await response.json();
        dispatch(setEvents(result));
      } catch (err: unknown) {
        let message = 'Network error occurred';
        if (err instanceof Error) message = err.message;
        dispatch(setError(message));
      }
    };
    fetchEvents();
  }, [dispatch]);

  const handleEditClick = (eventId: number) => {
    const event = events.find((e) => e.event_id === eventId);
    if (event) {
      setEditingId(eventId);
      setEditedEvent({
        event_id: event.event_id,
        title: event.title,
        description: event.description,
        venue_id: event.venue_id.toString(),
        category: event.category,
        date: event.date,
        time: event.time,
        ticket_price: event.ticket_price.toString(),
        tickets_total: event.tickets_total.toString(),
        tickets_sold: event.tickets_sold.toString(),
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, isNew: boolean = false) => {
    const { name, value } = e.target;
    if (isNew) {
      setNewEvent((prev) => ({
        ...prev,
        [name]: name === 'ticket_price' ? parseFloat(value).toString() : value,
      }));
    } else {
      setEditedEvent((prev) => ({
        ...prev,
        [name]: name === 'ticket_price' ? parseFloat(value).toString() : value,
      }));
    }
  };

  const handleSave = async () => {
    if (editingId !== null) {
      const payload = {
        event_id: editingId,
        title: editedEvent.title,
        description: editedEvent.description,
        venue_id: parseInt(editedEvent.venue_id, 10),
        category: editedEvent.category,
        date: editedEvent.date,
        time: editedEvent.time,
        ticket_price: parseFloat(editedEvent.ticket_price),
        tickets_total: parseInt(editedEvent.tickets_total, 10),
        tickets_sold: parseInt(editedEvent.tickets_sold, 10),
      };
      dispatch(setLoading());
      try {
        const response = await fetch(`http://localhost:8081/Events/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error('Update failed');
        await response.json();
        dispatch(updateEvent(payload));
        setEditingId(null);
      } catch (err: unknown) {
        let message = 'Network error occurred';
        if (err instanceof Error) message = err.message;
        dispatch(setError(message));
      }
    }
  };

  const handleCreate = async () => {
    // Basic validation
    if (!newEvent.title || !newEvent.venue_id || !newEvent.date || !newEvent.time || !newEvent.ticket_price || !newEvent.tickets_total) {
      dispatch(setError('Please fill all required fields (Title, Venue ID, Date, Time, Ticket Price, Total Tickets)'));
      return;
    }

    const payload = {
      title: newEvent.title,
      description: newEvent.description,
      venue_id: parseInt(newEvent.venue_id, 10),
      category: newEvent.category,
      date: newEvent.date,
      time: newEvent.time,
      ticket_price: parseFloat(newEvent.ticket_price),
      tickets_total: parseInt(newEvent.tickets_total, 10),
      tickets_sold: parseInt(newEvent.tickets_sold, 10) || 0, // Default to 0 if not provided
    };
    dispatch(setLoading());
    try {
      const response = await fetch('http://localhost:8081/Events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Create failed');
      const result = await response.json();
      if (result && result.event_id) {
        dispatch(setEvents([...events, result]));
      } else {
        throw new Error('Invalid response format from server');
      }
      setCreating(false);
      setNewEvent({
        title: '',
        description: '',
        venue_id: '',
        category: '',
        date: '',
        time: '',
        ticket_price: '',
        tickets_total: '',
        tickets_sold: '',
      });
    } catch (err: unknown) {
      let message = 'Network error occurred';
      if (err instanceof Error) message = err.message;
      dispatch(setError(message));
    }
  };

  const handleDelete = async (eventId: number) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      dispatch(setLoading());
      try {
        const response = await fetch(`http://localhost:8081/Events/${eventId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Delete failed');
        await response.json();
        dispatch(deleteEvent(eventId));
      } catch (err: unknown) {
        let message = 'Network error occurred';
        if (err instanceof Error) message = err.message;
        dispatch(setError(message));
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setCreating(false);
    setNewEvent({
      title: '',
      description: '',
      venue_id: '',
      category: '',
      date: '',
      time: '',
      ticket_price: '',
      tickets_total: '',
      tickets_sold: '',
    });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="manage-events">
      <h2 className="events-title">Manage Events</h2>
      <button className="create-btn" onClick={() => setCreating(true)}>Create Event</button>
      <table className="events-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Venue ID</th>
            <th>Category</th>
            <th>Date</th>
            <th>Time</th>
            <th>Ticket Price</th>
            <th>Total Tickets</th>
            <th>Sold Tickets</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {creating && (
            <tr className="event-row">
              <td><input type="text" name="title" value={newEvent.title} onChange={(e) => handleInputChange(e, true)} placeholder="Title" className="form-input" required /></td>
              <td><textarea name="description" value={newEvent.description} onChange={(e) => handleInputChange(e, true)} placeholder="Description" className="form-input" /></td>
              <td><input type="number" name="venue_id" value={newEvent.venue_id} onChange={(e) => handleInputChange(e, true)} placeholder="Venue ID" className="form-input" required /></td>
              <td><input type="text" name="category" value={newEvent.category} onChange={(e) => handleInputChange(e, true)} placeholder="Category" className="form-input" /></td>
              <td><input type="date" name="date" value={newEvent.date} onChange={(e) => handleInputChange(e, true)} className="form-input" required /></td>
              <td><input type="time" name="time" value={newEvent.time} onChange={(e) => handleInputChange(e, true)} className="form-input" required /></td>
              <td><input type="number" step="0.01" name="ticket_price" value={newEvent.ticket_price} onChange={(e) => handleInputChange(e, true)} placeholder="Ticket Price" className="form-input" required /></td>
              <td><input type="number" name="tickets_total" value={newEvent.tickets_total} onChange={(e) => handleInputChange(e, true)} placeholder="Total Tickets" className="form-input" required /></td>
              <td><input type="number" name="tickets_sold" value={newEvent.tickets_sold} onChange={(e) => handleInputChange(e, true)} placeholder="Tickets Sold" className="form-input" /></td>
              <td>
                <button className="save-btn" onClick={handleCreate} disabled={!newEvent.title || !newEvent.venue_id || !newEvent.date || !newEvent.time || !newEvent.ticket_price || !newEvent.tickets_total}><FaEdit /></button>
                <button className="cancel-btn" onClick={handleCancel}><FaTrashIcon /></button>
              </td>
            </tr>
          )}
          {events.map((event) => (
            <tr key={event.event_id} className="event-row">
              {editingId === event.event_id ? (
                <>
                  <td><input type="text" name="title" value={editedEvent.title} onChange={handleInputChange} className="form-input" required /></td>
                  <td><textarea name="description" value={editedEvent.description} onChange={handleInputChange} className="form-input" /></td>
                  <td><input type="number" name="venue_id" value={editedEvent.venue_id} onChange={handleInputChange} className="form-input" required /></td>
                  <td><input type="text" name="category" value={editedEvent.category} onChange={handleInputChange} className="form-input" /></td>
                  <td><input type="date" name="date" value={editedEvent.date} onChange={handleInputChange} className="form-input" required /></td>
                  <td><input type="time" name="time" value={editedEvent.time} onChange={handleInputChange} className="form-input" required /></td>
                  <td><input type="number" step="0.01" name="ticket_price" value={editedEvent.ticket_price} onChange={handleInputChange} className="form-input" required /></td>
                  <td><input type="number" name="tickets_total" value={editedEvent.tickets_total} onChange={handleInputChange} className="form-input" required /></td>
                  <td><input type="number" name="tickets_sold" value={editedEvent.tickets_sold} onChange={handleInputChange} className="form-input" /></td>
                  <td>
                    <button className="save-btn" onClick={handleSave} disabled={!editedEvent.title || !editedEvent.venue_id || !editedEvent.date || !editedEvent.time || !editedEvent.ticket_price || !editedEvent.tickets_total}><FaEdit /></button>
                    <button className="cancel-btn" onClick={handleCancel}><FaTrashIcon /></button>
                  </td>
                </>
              ) : (
                <>
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>{event.venue_id}</td>
                  <td>{event.category}</td>
                  <td>{event.date}</td>
                  <td>{event.time}</td>
                  <td>${event.ticket_price}</td>
                  <td>{event.tickets_total}</td>
                  <td>{event.tickets_sold}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditClick(event.event_id)}><FaEdit /></button>
                    <button className="delete-btn" onClick={() => handleDelete(event.event_id)}><FaTrashIcon /></button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEvents;
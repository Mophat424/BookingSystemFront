// // src/features/events/eventSlice.ts
// import { createSlice } from '@reduxjs/toolkit';
// import type {PayloadAction} from '@reduxjs/toolkit';

// interface Venue {
//   venue_id: number;
//   name: string;
//   address: string;
//   capacity: number;
//   created_at: string;
// }

// interface Event {
//   event_id: number;
//   title: string;
//   description: string;
//   venue_id: number;
//   category: string;
//   date: string;
//   time: string;
//   ticket_price: number;
//   tickets_total: number;
//   tickets_sold: number;
//   created_at: string;
//   updated_at: string;
//   venue?: Venue; // Optional relation
// }

// interface EventState {
//   events: Event[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: EventState = {
//   events: [],
//   loading: false,
//   error: null,
// };

// const eventSlice = createSlice({
//   name: 'events',
//   initialState,
//   reducers: {
//     setLoading: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     setEvents: (state, action: PayloadAction<Event[]>) => {
//       state.loading = false;
//       state.events = action.payload;
//     },
//     setError: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     updateEvent: (state, action: PayloadAction<Partial<Event> & { event_id: number }>) => {
//       const index = state.events.findIndex((e) => e.event_id === action.payload.event_id);
//       if (index !== -1) {
//         state.events[index] = { ...state.events[index], ...action.payload, updated_at: new Date().toISOString() };
//       }
//     },
//     deleteEvent: (state, action: PayloadAction<number>) => {
//       state.events = state.events.filter((e) => e.event_id !== action.payload);
//     },
//   },
// });

// export const { setLoading, setEvents, setError, updateEvent, deleteEvent } = eventSlice.actions;
// export default eventSlice.reducer;









import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Venue {
  venue_id: number;
  name: string;
  address: string;
  capacity: number;
  created_at: string;
}

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
  venue?: Venue;
}

interface EventState {
  events: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  events: [],
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.loading = false;
      state.events = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateEvent: (state, action: PayloadAction<Partial<Event> & { event_id: number }>) => {
      const index = state.events.findIndex((e) => e.event_id === action.payload.event_id);
      if (index !== -1) {
        state.events[index] = {
          ...state.events[index],
          ...action.payload,
          updated_at: new Date().toISOString(),
        };
      }
    },
    deleteEvent: (state, action: PayloadAction<number>) => {
      state.events = state.events.filter((e) => e.event_id !== action.payload);
    },
  },
});

export const { setLoading, setEvents, setError, updateEvent, deleteEvent } = eventSlice.actions;
export default eventSlice.reducer;

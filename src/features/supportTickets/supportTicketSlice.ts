// // src/features/supportTickets/supportTicketSlice.ts
// import { createSlice } from '@reduxjs/toolkit';
// import type {PayloadAction} from '@reduxjs/toolkit';

// interface SupportTicket {
//   ticket_id: number;
//   user_id: number;
//   title: string;
//   description: string;
//   status: string;
//   created_at: string;
// }

// interface SupportTicketState {
//   supportTickets: SupportTicket[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: SupportTicketState = {
//   supportTickets: [],
//   loading: false,
//   error: null,
// };

// const supportTicketSlice = createSlice({
//   name: 'supportTickets',
//   initialState,
//   reducers: {
//     setLoading: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     setSupportTickets: (state, action: PayloadAction<SupportTicket[]>) => {
//       state.loading = false;
//       state.supportTickets = action.payload;
//     },
//     setError: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     deleteSupportTicket: (state, action: PayloadAction<number>) => {
//       state.supportTickets = state.supportTickets.filter((t) => t.ticket_id !== action.payload);
//     },
//   },
// });

// export const { setLoading, setSupportTickets, setError, deleteSupportTicket } = supportTicketSlice.actions;
// export default supportTicketSlice.reducer;







// src/features/supportTickets/supportTicketSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface SupportTicket {
  ticket_id: number;
  user_id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
}

interface SupportTicketState {
  supportTickets: SupportTicket[];
  loading: boolean;
  error: string | null;
}

const initialState: SupportTicketState = {
  supportTickets: [],
  loading: false,
  error: null,
};

const supportTicketSlice = createSlice({
  name: 'supportTickets',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setSupportTickets: (state, action: PayloadAction<SupportTicket[]>) => {
      state.loading = false;
      state.supportTickets = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSupportTicket: (state, action: PayloadAction<number>) => {
      state.supportTickets = state.supportTickets.filter((t) => t.ticket_id !== action.payload);
    },
  },
});

export const { setLoading, setSupportTickets, setError, deleteSupportTicket } = supportTicketSlice.actions;
export default supportTicketSlice.reducer;
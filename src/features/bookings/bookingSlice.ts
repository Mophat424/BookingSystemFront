// // src/features/bookings/bookingSlice.ts
// import { createSlice } from '@reduxjs/toolkit';
// import type {PayloadAction} from '@reduxjs/toolkit';

// export interface Booking {
//   booking_id: number;
//   user_id: number;
//   event_id: number;
//   created_at: string;
// }

// interface BookingState {
//   bookings: Booking[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: BookingState = {
//   bookings: [],
//   loading: false,
//   error: null,
// };

// const bookingSlice = createSlice({
//   name: 'bookings',
//   initialState,
//   reducers: {
//     setLoading: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     setBookings: (state, action: PayloadAction<Booking[]>) => {
//       state.loading = false;
//       state.bookings = action.payload;
//     },
//     setError: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     deleteBooking: (state, action: PayloadAction<number>) => {
//       state.bookings = state.bookings.filter((b) => b.booking_id !== action.payload);
//     },
//   },
// });

// export const { setLoading, setBookings, setError, deleteBooking } = bookingSlice.actions;
// export default bookingSlice.reducer;








// src/features/bookings/bookingSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Booking {
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
  }; // Added event details
}

interface BookingState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.loading = false;
      state.bookings = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteBooking: (state, action: PayloadAction<number>) => {
      state.bookings = state.bookings.filter((b) => b.booking_id !== action.payload);
    },
  },
});

export const { setLoading, setBookings, setError, deleteBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
// src/features/payments/paymentSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface Payment {
  payment_id: number;
  user_id: number;
  booking_id: number;
  amount: number;
  status: string;
  created_at: string;
}

interface PaymentState {
  payments: Payment[];
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  payments: [],
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setPayments: (state, action: PayloadAction<Payment[]>) => {
      state.loading = false;
      state.payments = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createPayment: (state, action: PayloadAction<Payment>) => {
      state.payments.push(action.payload);
    },
  },
});

export const { setLoading, setPayments, setError, createPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
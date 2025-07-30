
// // src/app/store.ts
// import { configureStore } from '@reduxjs/toolkit';
// import { useDispatch, useSelector } from 'react-redux';
// import type { TypedUseSelectorHook } from 'react-redux';
// import userReducer from '../features/login/userSlice';
// import { usersAPI } from '../features/users/usersAPI';
// import eventReducer from '../features/events/eventSlice';
// import bookingReducer from '../features/bookings/bookingSlice'; 

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     [usersAPI.reducerPath]: usersAPI.reducer,
//     events: eventReducer,
//     bookings: bookingReducer, 
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(usersAPI.middleware),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// // Typed hooks for better TypeScript support
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;





// // src/app/store.ts
// import { configureStore } from '@reduxjs/toolkit';
// import { useDispatch, useSelector } from 'react-redux';
// import type { TypedUseSelectorHook } from 'react-redux';
// import userReducer from '../features/login/userSlice';
// import { usersAPI } from '../features/users/usersAPI';
// import eventReducer from '../features/events/eventSlice';
// import bookingReducer from '../features/bookings/bookingSlice';
// import supportTicketReducer from '../features/supportTickets/supportTicketSlice'; // Add this import

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     [usersAPI.reducerPath]: usersAPI.reducer,
//     events: eventReducer,
//     bookings: bookingReducer,
//     supportTickets: supportTicketReducer, // Add this line
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(usersAPI.middleware),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// // Typed hooks for better TypeScript support
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;











// // src/app/store.ts
// import { configureStore } from '@reduxjs/toolkit';
// import { useDispatch, useSelector } from 'react-redux';
// import type { TypedUseSelectorHook } from 'react-redux';
// import userReducer from '../features/login/userSlice';
// import { usersAPI } from '../features/users/usersAPI';
// import eventReducer from '../features/events/eventSlice';
// import bookingReducer from '../features/bookings/bookingSlice';
// import supportTicketReducer from '../features/supportTickets/supportTicketSlice';
// import paymentReducer from '../features/payments/paymentSlice'; // New import

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     [usersAPI.reducerPath]: usersAPI.reducer,
//     events: eventReducer,
//     bookings: bookingReducer,
//     supportTickets: supportTicketReducer,
//     payments: paymentReducer, // New line
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(usersAPI.middleware),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// // Typed hooks for better TypeScript support
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;









// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import userReducer from '../features/login/userSlice';
import { usersAPI } from '../features/users/usersAPI';
import eventReducer from '../features/events/eventSlice';
import bookingReducer from '../features/bookings/bookingSlice';
import supportTicketReducer from '../features/supportTickets/supportTicketSlice';
import paymentReducer from '../features/payments/paymentSlice';
import userListReducer from '../features/users/userListSlice'; // Ensure this is correct

export const store = configureStore({
  reducer: {
    user: userReducer,
    [usersAPI.reducerPath]: usersAPI.reducer,
    events: eventReducer,
    bookings: bookingReducer,
    supportTickets: supportTicketReducer,
    payments: paymentReducer,
    userList: userListReducer, // Correct key
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks for better TypeScript support
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
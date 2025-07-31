// // src/features/login/userSlice.ts
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import type {PayloadAction} from '@reduxjs/toolkit';

// interface PublicUser {
//   user_id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   role: "user" | "admin" | null;
//   isVerified?: boolean;
//   created_at?: string;
//   updated_at?: string;
//   image_url?: string;
//   contact_phone?: string;
//   address?: string;
// }

// interface UserState {
//   user: PublicUser | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   error: string | null;
//   loading: boolean;
//   needsVerification: boolean;
// }

// const initialState: UserState = {
//   user: null,
//   token: localStorage.getItem('token') || null,
//   isAuthenticated: !!localStorage.getItem('token'),
//   error: null,
//   loading: false,
//   needsVerification: false,
// };

// // Async thunk for registration
// export const registerUser = createAsyncThunk(
//   'user/register',
//   async (userData: { first_name: string; last_name: string; email: string; password: string; contact_phone?: string; address?: string }, { rejectWithValue }) => {
//     try {
//       const response = await fetch('http://localhost:8081/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(userData),
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || 'Registration failed');
//       return data;
//     } catch (error: unknown) {
//       if (error instanceof Error) return rejectWithValue(error.message);
//       return rejectWithValue('An unknown error occurred');
//     }
//   }
// );

// // Async thunk for login
// export const loginUser = createAsyncThunk(
//   'user/login',
//   async (credentials: { email: string; password: string }, { rejectWithValue }) => {
//     try {
//       const response = await fetch('http://localhost:8081/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(credentials),
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || 'Login failed');
//       return data;
//     } catch (error: unknown) {
//       if (error instanceof Error) return rejectWithValue(error.message);
//       return rejectWithValue('An unknown error occurred');
//     }
//   }
// );

// // Async thunk for verification
// export const verifyUser = createAsyncThunk(
//   'user/verify',
//   async ({ email, otp }: { email: string; otp: string }, { rejectWithValue }) => {
//     try {
//       const response = await fetch('http://localhost:8081/auth/verify', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, otp }),
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || 'Verification failed');
//       return data;
//     } catch (error: unknown) {
//       if (error instanceof Error) return rejectWithValue(error.message);
//       return rejectWithValue('An unknown error occurred');
//     }
//   }
// );

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<PublicUser | null>) => {
//       state.user = action.payload;
//     },
//     setToken: (state, action: PayloadAction<string | null>) => {
//       state.token = action.payload;
//       if (action.payload) {
//         localStorage.setItem('token', action.payload);
//         state.isAuthenticated = true;
//         state.needsVerification = false;
//       } else {
//         localStorage.removeItem('token');
//         state.isAuthenticated = false;
//       }
//     },
//     setAuthenticated: (state, action: PayloadAction<boolean>) => {
//       state.isAuthenticated = action.payload;
//     },
//     setNeedsVerification: (state, action: PayloadAction<boolean>) => {
//       state.needsVerification = action.payload;
//     },
//     setError: (state, action: PayloadAction<string | null>) => {
//       state.error = action.payload;
//     },
//     setLoading: (state, action: PayloadAction<boolean>) => {
//       state.loading = action.payload;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       state.needsVerification = false;
//       localStorage.removeItem('token');
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ message: string; token: string; user: PublicUser }>) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.needsVerification = true;
//         localStorage.setItem('token', action.payload.token);
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string; user: PublicUser }>) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isAuthenticated = true;
//         state.needsVerification = false;
//         localStorage.setItem('token', action.payload.token);
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(verifyUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(verifyUser.fulfilled, (state, action: PayloadAction<{ token: string; user: PublicUser }>) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isAuthenticated = true;
//         state.needsVerification = false;
//         localStorage.setItem('token', action.payload.token);
//       })
//       .addCase(verifyUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { 
//   setUser, 
//   setToken, 
//   setAuthenticated, 
//   setNeedsVerification, 
//   setError, 
//   setLoading, 
//   logout, 
//   clearError 
// } = userSlice.actions;

// export default userSlice.reducer;













// src/features/login/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface PublicUser {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: "user" | "admin" | null;
  isVerified?: boolean;
  created_at?: string;
  updated_at?: string;
  image_url?: string;
  contact_phone?: string;
  address?: string;
}

interface UserState {
  user: PublicUser | null;
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
  loading: boolean;
  needsVerification: boolean;
}

const initialState: UserState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  error: null,
  loading: false,
  needsVerification: false,
};

// Async thunk for registration
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: { first_name: string; last_name: string; email: string; password: string; contact_phone?: string; address?: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8081/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Registration failed');
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Async thunk for login
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8081/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Async thunk for verification
export const verifyUser = createAsyncThunk(
  'user/verify',
  async ({ email, otp }: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8081/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Verification failed');
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<PublicUser | null>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem('token', action.payload);
        state.isAuthenticated = true;
        state.needsVerification = false;
      } else {
        localStorage.removeItem('token');
        state.isAuthenticated = false;
      }
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setNeedsVerification: (state, action: PayloadAction<boolean>) => {
      state.needsVerification = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.needsVerification = false;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ message: string; token: string; user: PublicUser }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.needsVerification = true;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string; user: PublicUser }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.needsVerification = false;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyUser.fulfilled, (state, action: PayloadAction<{ token: string; user: PublicUser }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.needsVerification = false;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  setUser, 
  setToken, 
  setAuthenticated, 
  setNeedsVerification, 
  setError, 
  setLoading, 
  logout, 
  clearError 
} = userSlice.actions;

export default userSlice.reducer;









// // src/features/login/userSlice.ts
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

// interface PublicUser {
//   user_id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   role: "user" | "admin" | null;
//   isVerified?: boolean;
//   created_at?: string;
//   updated_at?: string;
//   image_url?: string;
//   contact_phone?: string;
//   address?: string;
// }

// interface UserState {
//   user: PublicUser | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   error: string | null;
//   loading: boolean;
//   needsVerification: boolean;
// }

// const initialState: UserState = {
//   user: null,
//   token: localStorage.getItem('token') || null,
//   isAuthenticated: !!localStorage.getItem('token'),
//   error: null,
//   loading: false,
//   needsVerification: false,
// };

// // Async thunk for registration
// export const registerUser = createAsyncThunk(
//   'user/register',
//   async (userData: { first_name: string; last_name: string; email: string; password: string; contact_phone?: string; address?: string }, { rejectWithValue }) => {
//     try {
//       const response = await fetch('https://bookingsystemback.onrender.com/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(userData),
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || 'Registration failed');
//       return data;
//     } catch (error: unknown) {
//       if (error instanceof Error) return rejectWithValue(error.message);
//       return rejectWithValue('An unknown error occurred');
//     }
//   }
// );

// // Async thunk for login
// export const loginUser = createAsyncThunk(
//   'user/login',
//   async (credentials: { email: string; password: string }, { rejectWithValue }) => {
//     try {
//       const response = await fetch('https://bookingsystemback.onrender.com/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(credentials),
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || 'Login failed');
//       return data;
//     } catch (error: unknown) {
//       if (error instanceof Error) return rejectWithValue(error.message);
//       return rejectWithValue('An unknown error occurred');
//     }
//   }
// );

// // Async thunk for verification
// export const verifyUser = createAsyncThunk(
//   'user/verify',
//   async ({ email, otp }: { email: string; otp: string }, { rejectWithValue }) => {
//     try {
//       const response = await fetch('https://bookingsystemback.onrender.com/auth/verify', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, otp }),
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || 'Verification failed');
//       return data;
//     } catch (error: unknown) {
//       if (error instanceof Error) return rejectWithValue(error.message);
//       return rejectWithValue('An unknown error occurred');
//     }
//   }
// );

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<PublicUser | null>) => {
//       state.user = action.payload;
//     },
//     setToken: (state, action: PayloadAction<string | null>) => {
//       state.token = action.payload;
//       if (action.payload) {
//         localStorage.setItem('token', action.payload);
//         state.isAuthenticated = true;
//         state.needsVerification = false;
//       } else {
//         localStorage.removeItem('token');
//         state.isAuthenticated = false;
//       }
//     },
//     setAuthenticated: (state, action: PayloadAction<boolean>) => {
//       state.isAuthenticated = action.payload;
//     },
//     setNeedsVerification: (state, action: PayloadAction<boolean>) => {
//       state.needsVerification = action.payload;
//     },
//     setError: (state, action: PayloadAction<string | null>) => {
//       state.error = action.payload;
//     },
//     setLoading: (state, action: PayloadAction<boolean>) => {
//       state.loading = action.payload;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       state.needsVerification = false;
//       localStorage.removeItem('token');
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ message: string; token: string; user: PublicUser }>) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.needsVerification = true;
//         localStorage.setItem('token', action.payload.token);
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string; user: PublicUser }>) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isAuthenticated = true;
//         state.needsVerification = false;
//         localStorage.setItem('token', action.payload.token);
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(verifyUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(verifyUser.fulfilled, (state, action: PayloadAction<{ token: string; user: PublicUser }>) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isAuthenticated = true;
//         state.needsVerification = false;
//         localStorage.setItem('token', action.payload.token);
//       })
//       .addCase(verifyUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const {
//   setUser,
//   setToken,
//   setAuthenticated,
//   setNeedsVerification,
//   setError,
//   setLoading,
//   logout,
//   clearError
// } = userSlice.actions;

// export default userSlice.reducer;

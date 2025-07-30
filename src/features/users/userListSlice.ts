// src/features/users/userListSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

// Define PublicUser interface locally
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

interface UserListState {
  users: PublicUser[];
  loading: boolean;
  error: string | null;
}

const initialState: UserListState = {
  users: [],
  loading: false,
  error: null,
};

const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setUsers: (state, action: PayloadAction<PublicUser[]>) => {
      state.loading = false;
      state.users = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUser: (state, action: PayloadAction<PublicUser>) => {
      const index = state.users.findIndex(user => user.user_id === action.payload.user_id);
      if (index !== -1) state.users[index] = action.payload;
    },
  },
});

export const { setLoading, setUsers, setError, updateUser } = userListSlice.actions;
export default userListSlice.reducer;






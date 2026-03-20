import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  user: {
    name: string;
    email?: string;
    avatar?: string;
  } | null;
}

const initialState: AuthState = {
  isLoggedIn: false, // Default to false
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ name: string; email?: string }>) => {
      state.isLoggedIn = true;
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
      };
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    updateProfile: (state, action: PayloadAction<{ name?: string; email?: string }>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { login, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;

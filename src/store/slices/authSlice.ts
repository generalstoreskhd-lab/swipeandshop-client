import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  isGuest: boolean;
  user: {
    name: string;
    email?: string;
    avatar?: string;
  } | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  isGuest: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ name: string; email?: string }>) => {
      state.isLoggedIn = true;
      state.isGuest = false;
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
      };
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.isGuest = false;
      state.user = null;
    },
    skipAuth: (state) => {
      state.isGuest = true;
      state.isLoggedIn = false;
    },
    updateProfile: (state, action: PayloadAction<{ name?: string; email?: string }>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { login, logout, updateProfile, skipAuth } = authSlice.actions;
export default authSlice.reducer;

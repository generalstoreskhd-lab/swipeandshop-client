import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Authentication state interface.
 * Tracks login status, guest mode, and user profile details.
 */
interface AuthState {
  isLoggedIn: boolean;
  isGuest: boolean;
  user: {
    name: string;
    email?: string;
    role: 'client' | 'admin';
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
    login: (state, action: PayloadAction<{ name: string; email?: string; role: 'client' | 'admin' }>) => {
      state.isLoggedIn = true;
      state.isGuest = false;
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
        role: action.payload.role,
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
    /**
     * Synchronizes the auth state from a listener (e.g. onAuthStateChanged).
     */
    setAuthUser: (state, action: PayloadAction<AuthState["user"]>) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
      state.isGuest = false;
    },
  },
});

export const { login, logout, updateProfile, skipAuth, setAuthUser } = authSlice.actions;
export default authSlice.reducer;

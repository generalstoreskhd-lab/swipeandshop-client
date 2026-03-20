import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import notificationsReducer from './slices/notificationsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import salaryReducer from './salarySlice';

export const store = configureStore({
  reducer: {
    salary: salaryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

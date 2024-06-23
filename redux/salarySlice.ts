import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SalaryState {
  basicSalary: number;
  earnings: { name: string; amount: number; epfApplicable: boolean }[];
  deductions: { name: string; amount: number }[];
}

const initialState: SalaryState = {
  basicSalary: 0,
  earnings: [],
  deductions: [],
};

const salarySlice = createSlice({
  name: 'salary',
  initialState,
  reducers: {
    setBasicSalary(state, action: PayloadAction<number>) {
      state.basicSalary = action.payload;
    },
    addEarning(state, action: PayloadAction<{ name: string; amount: number; epfApplicable: boolean }>) {
      state.earnings.push(action.payload);
    },
    removeEarning(state, action: PayloadAction<number>) {
      state.earnings.splice(action.payload, 1);
    },
    addDeduction(state, action: PayloadAction<{ name: string; amount: number }>) {
      state.deductions.push(action.payload);
    },
    removeDeduction(state, action: PayloadAction<number>) {
      state.deductions.splice(action.payload, 1);
    },
  },
});

export const { setBasicSalary, addEarning, removeEarning, addDeduction, removeDeduction } = salarySlice.actions;
export default salarySlice.reducer;

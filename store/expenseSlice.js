import { createSlice } from "@reduxjs/toolkit";

const DummyExpenses = [
  {
    id: "e1",
    description: "A pair of Trousers",
    amount: 21.8,
    date: new Date("2022-12-01"),
  },
  {
    id: "e2",
    description: "A Motivational Book",
    amount: 14.99,
    date: new Date("2022-12-10"),
  },
  {
    id: "e3",
    description: "A Course on Udemy",
    amount: 12.99,
    date: new Date("2021-12-31"),
  },
  {
    id: "e4",
    description: "Another Book",
    amount: 11.5,
    date: new Date("2021-11-13"),
  },
  {
    id: "e5",
    description: "Another Book",
    amount: 11.5,
    date: new Date("2022-12-20"),
  },
];

const expenseSlice = createSlice({
  name: "expense",
  initialState: [],

  reducers: {
    addExpense: (state, action) => {
      state.push(action.payload);
    },
    setExpenses: (state, action) => {
      const inverted = action.payload.reverse();
      return inverted
    },
    deleteExpense: (state, action) => {
      const { id } = action.payload;
      const existingExpense = state.find((expense) => expense.id === id);
      if (existingExpense) {
        return state.filter((expense) => expense.id !== id);
      }
    },
    updateExpense: (state, action) => {
      const { id, description, amount, date } = action.payload;
      console.log('payload',action.payload);
      const existingExpense = state.find((expense) => expense.id === id);
      console.log('existing expense', existingExpense);
      if (existingExpense) {
        existingExpense.description = description;
        existingExpense.amount = amount;
        existingExpense.date = date;
      }
    },
  },
});

export const { addExpense, deleteExpense, updateExpense, setExpenses } =
  expenseSlice.actions;

export default expenseSlice.reducer;

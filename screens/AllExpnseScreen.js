import React from "react";
import ExpenseOutput from "../components/expenseOutPut/ExpenseOutput";
import { useSelector } from "react-redux";

const AllExpnseScreen = () => {
    const expensesState = useSelector((state) => state.expenses);
  return (
      <ExpenseOutput expenses={expensesState} expensePeriod="total" />
  );
};

export default AllExpnseScreen;

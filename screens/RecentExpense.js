import React from "react";
import ExpenseOutput from "../components/expenseOutPut/ExpenseOutput";

const RecentExpense = () => {
  return (
    <ExpenseOutput expensePeriod="last 7 days" />
  );
};

export default RecentExpense;

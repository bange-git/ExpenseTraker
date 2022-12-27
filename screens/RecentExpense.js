import React from "react";
import ExpenseOutput from "../components/expenseOutPut/ExpenseOutput";
import { useSelector } from "react-redux";
import { getDateMinusDays } from "../utils/date";
const RecentExpense = () => {
  const expenses = useSelector((state) => state.expenses);
  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);
    return expense.date > date7daysAgo;
  });
  return (
    <ExpenseOutput expenses={recentExpenses} expensePeriod="last 7 days" />
  );
};

export default RecentExpense;

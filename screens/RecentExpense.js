import React, { useEffect, useState } from "react";
import ExpenseOutput from "../components/expenseOutPut/ExpenseOutput";
import { useSelector, useDispatch } from "react-redux";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";
import { setExpenses } from "../store/expenseSlice";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const RecentExpense = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const expenses = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        dispatch(setExpenses(expenses));
      } catch (error) {
        setError("Could not fetch any data!");
      }
      setIsFetching(false);
    };
    fetchData();
  }, []);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);
    return expense.date > date7daysAgo;
  });

  const errorOverlayHandler = () => {
    setError(null);
  };
  if (isFetching) {
    return <LoadingOverlay />;
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorOverlayHandler} />;
  }

  return (
    <ExpenseOutput expenses={recentExpenses} expensePeriod="last 7 days" />
  );
};

export default RecentExpense;

import React, { useEffect, useState } from "react";
import ExpenseOutput from "../components/expenseOutPut/ExpenseOutput";
import { useSelector, useDispatch } from "react-redux";
import { setExpenses } from "../store/expenseSlice";
import { fetchExpenses } from "../utils/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const AllExpnseScreen = () => {
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
        setError("Could not fetch all expenses");
      }
      setIsFetching(false);
    };
    fetchData();
  }, []);

  const errorHandler = () => {
    setError(null);
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  if(error && !isFetching) return <ErrorOverlay message={error}  onConfirm={errorHandler}/>
  return <ExpenseOutput expenses={expenses} expensePeriod="total" />;
};

export default AllExpnseScreen;

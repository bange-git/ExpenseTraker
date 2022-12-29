import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../contants/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  addExpense,
  deleteExpense,
  updateExpense,
} from "../store/expenseSlice";
import ExpenseForm from "../components/manageExpense/ExpenseForm";
import { storeExpense, removeExpense, editExpense } from "../utils/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const ManageExpense = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const editedExpenseId = route.params?.expenseId;
  console.log(editedExpenseId);
  const isEditing = !!editedExpenseId;

  const expenses = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  const selectedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expenses" : "Add Expense",
    });
  }, [isEditing, navigation]);

  const deleteItemHandler = async () => {
    setIsSubmitting(true);
    try {
      await removeExpense(editedExpenseId);
      dispatch(deleteExpense({ id: editedExpenseId }));
      navigation.goBack();
    } catch (error) {
      setError("Could not delete data - please try again later!");
    }
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = async (expenseData) => {
    let { amount, date, description } = expenseData;
    try {
      if (isEditing) {
        setIsSubmitting(true);
        dispatch(
          updateExpense({ id: editedExpenseId, amount, date, description })
        );
        await editExpense(editedExpenseId, expenseData);
      } else {
        setIsSubmitting(true);
        const id = await storeExpense(expenseData);
        dispatch(addExpense({ id: id, amount, date, description }));
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not Save Data - Please try again later!");
    }
  };


  if (isSubmitting) return <LoadingOverlay />;
  if (error && !isSubmitting)
    return <ErrorOverlay message={error} />;
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "update" : "add"}
        onSubmit={confirmHandler}
        defaultValue={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteItemHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});

export default ManageExpense;

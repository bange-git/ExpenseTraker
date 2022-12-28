import React, { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import Button from "../components/ui/Button";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../contants/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  addExpense,
  deleteExpense,
  updateExpense,
} from "../store/expenseSlice";
import ExpenseForm from "../components/manageExpense/ExpenseForm";

const ManageExpense = ({ route, navigation }) => {
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

  const deleteItemHandler = () => {
    console.log(expenses);
    dispatch(deleteExpense({ id: editedExpenseId }));
    navigation.goBack();
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = (expenseData) => {
    let { amount, date, description } = expenseData;
    if (isEditing) {
      //id = editedExpenseId;
      dispatch(
        updateExpense({ id: editedExpenseId, amount, date, description })
      );
    } else {
      dispatch(
        addExpense({ id: Math.random().toString(), amount, date, description })
      );
    }
    navigation.goBack();
  };
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

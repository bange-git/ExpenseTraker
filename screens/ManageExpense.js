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
  const isEditing = !!editedExpenseId;

  const expenses = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

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
  const confirmHandler = () => {
    if (isEditing) {
      dispatch(
        updateExpense({
          id: editedExpenseId,
          description: "test case update",
          amount: 23.7,
          date: new Date("2022-12-24"),
        })
      );
    } else {
      dispatch(
        addExpense({
          description: "test case add",
          amount: 23.7,
          date: new Date("2022-12-24"),
        })
      );
    }
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <ExpenseForm />
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "update" : "add"}
        </Button>
      </View>
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

export default ManageExpense;

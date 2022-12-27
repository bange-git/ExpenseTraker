import React from "react";
import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../contants/styles";
import ExpenseList from "./ExpenseList";
import ExpenseSummary from "./ExpenseSummary";
import { useSelector } from "react-redux";


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
    description: "Babies Stuffs",
    amount: 121.99,
    date: new Date("2022-11-10"),
  },
  {
    id: "e6",
    description: "Paid Rent",
    amount: 1500,
    date: new Date("2022-12-01"),
  },
];

const ExpenseOutput = ({ expenses, expensePeriod }) => {
 return (
    <View style={styles.container}>
      <ExpenseSummary expenses={expenses} periodName={expensePeriod} />
      <ExpenseList expenses={expenses} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});

export default ExpenseOutput;

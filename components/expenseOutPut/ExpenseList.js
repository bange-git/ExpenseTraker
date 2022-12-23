import React from "react";
import { FlatList, View, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses }) => {
  const renderItemHandler = ({ item }) => {
    return (
      <ExpenseItem
        id={item.id}
        description={item.description}
        date={item.date}
        amount={item.amount}
      />
    );
  };
  return (
    <View>
      <FlatList
        data={expenses}
        renderItem={renderItemHandler}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ExpenseList;

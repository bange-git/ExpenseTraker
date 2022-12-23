import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../contants/styles";
import { getformattedDate } from "../../utils/date";
import { useNavigation } from "@react-navigation/native";

const ExpenseItem = ({id, description, date, amount }) => {

    const navigation = useNavigation();

    const expenseItemHandler = () => {
      navigation.navigate('ManageExpense', {
        expenseId: id
      })
    }

  return (
    <Pressable style={({pressed}) => pressed && styles.pressed}
    onPress={expenseItemHandler}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getformattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    pressed: {
     opacity: 0.75
    },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});

export default ExpenseItem;

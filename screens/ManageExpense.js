import React, { useLayoutEffect } from 'react'
import { View, Text } from 'react-native'

const ManageExpense = ({route, navigation}) => {
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
      navigation.setOptions({
      title: isEditing ? 'Edit Expenses' : 'Add Expense',
      });

    }, [isEditing, navigation]);
  return (
    <View>
        <Text>ManageExpense{editedExpenseId}</Text>
    </View>
  )
}

export default ManageExpense
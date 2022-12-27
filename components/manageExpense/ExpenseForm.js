import { View, Text } from "react-native";
import Input from "./Input";

const ExpenseForm = () => {
  const handleAmountChange = () => {};
  const handleDateChange = () => {};
  const handleDescriptionChange = () => {};
  return (
    <View>
      <Input
        label="Amount"
        textInputConfig={{
          KeyboardType: "decimal-pad",
          onChangeText: handleAmountChange,
        }}
      />
      <Input
        label="Date"
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: handleDescriptionChange,
        }}
      />
      <Input
        label="description"
        textInputConfig={{
          multiline: true,
          autoCapitalize: "sentence",
          //autoCorrect: false, //default is true
          onChangeText: handleDateChange,
        }}
      />
    </View>
  );
};

export default ExpenseForm;

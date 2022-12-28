import { View, StyleSheet, Text, Alert } from "react-native";
import { useState } from "react";
import Input from "./Input";
import Button from "../ui/Button";
import { getformattedDate } from "../../utils/date";
import { GlobalStyles } from "../../contants/styles";

const ExpenseForm = ({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValue,
}) => {
  const [inputValues, setInputValues] = useState({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValue ? defaultValue.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    description: {
      value: defaultValue ? defaultValue.description : "",
      isValid: true,
    },
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputValues((currentValues) => {
      return {
        ...currentValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputValues.amount.value,
      date: new Date(inputValues.date.value),
      description: inputValues.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputValues((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      //Alert.alert("Invalid Input", "kindly enter correct data!");
      return;
    }
    onSubmit(expenseData);
  };

  const formIsValid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRows}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputValues.amount.isValid}
          textInputConfig={{
            KeyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"), //set the identifier to amount, the 1st arg is this keyword.
            value: inputValues.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputValues.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            value: inputValues.date.value,
            onChangeText: inputChangeHandler.bind(this, "date"),
          }}
        />
      </View>
      <Input
        label="description"
        invalid={!inputValues.description.isValid}
        textInputConfig={{
          multiline: true,
          autoCapitalize: "sentence",
          //autoCorrect: false, //default is true
          value: inputValues.description.value,
          onChangeText: inputChangeHandler.bind(this, "description"),
        }}
      />
      {formIsValid && (
        <Text style={styles.errorText}>
          Invalid Input values. Please check your entered data!
        </Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 24,
  },
  inputRows: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    margin: 8,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
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

export default ExpenseForm;

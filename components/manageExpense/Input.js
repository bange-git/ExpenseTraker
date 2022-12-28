import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../../contants/styles";

const Input = ({ invalid, label, style, textInputConfig }) => {
  const inputStyle = [styles.input];
  if (textInputConfig && textInputConfig.multiline) {
    inputStyle.push(styles.multilineInput);
  }
  if (invalid) {
    inputStyle.push(styles.invalidInputs);
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyle} {...textInputConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  multilineInput: {
    textAlignVertical: "top",
    minHeight: 100,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInputs: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});

export default Input;

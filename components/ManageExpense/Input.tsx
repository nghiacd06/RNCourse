import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { globalStyles } from "../../constants/styles";

type InputProps = {
  style?: StyleProp<ViewStyle>;
  label: string;
  textInputConfigs?: Partial<TextInputProps>;
  invalid?: boolean;
};

const Input = ({ style, label, textInputConfigs, invalid }: InputProps) => {
  const inputStyles = [
    styles.input,
    ...(textInputConfigs?.multiline ? [styles.inputMultiline] : []),
    ...(invalid ? [styles.invalidInput] : []),
  ];

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        style={inputStyles}
        {...textInputConfigs}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
  label: {
    fontSize: 12,
    color: globalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: globalStyles.colors.primary100,
    color: globalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidInput: {
    backgroundColor: globalStyles.colors.error50,
  },
  invalidLabel: {
    color: globalStyles.colors.error500,
  },
});

export default Input;

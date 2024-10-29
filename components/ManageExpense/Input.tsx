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
};

const Input = ({ style, label, textInputConfigs }: InputProps) => {
  const inputStyles = [
    styles.input,
    ...(textInputConfigs?.multiline ? [styles.inputMultiline] : []),
  ];

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
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
});

export default Input;

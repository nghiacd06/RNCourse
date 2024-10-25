import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import Colors from "../../constants/colors";

type InstructionTextProps = PropsWithChildren<{ style?: object }>;

const InstructionText = ({ children, style }: InstructionTextProps) => {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  instructionText: {
    fontSize: 24,
    color: Colors.accent500,
  },
});

export default InstructionText;

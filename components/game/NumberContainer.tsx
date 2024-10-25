import { PropsWithChildren } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

type NumberContainerProps = PropsWithChildren<{}>;

const NumberContainer = ({ children }: NumberContainerProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: 24,
    margin: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    fontFamily: "open-sans",
    color: Colors.accent500,
    fontSize: 48,
    fontWeight: "bold",
  },
});

export default NumberContainer;

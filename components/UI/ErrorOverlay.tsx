import { Button, StyleSheet, Text, TextProps, View } from "react-native";
import { globalStyles } from "../../constants/styles";

type ErrorOverlayProps = {
  message: TextProps["children"];
  onConfirm: () => void;
};

const ErrorOverlay = ({ message, onConfirm }: ErrorOverlayProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button
        onPress={onConfirm}
        title="Okay"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: globalStyles.colors.primary700,
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ErrorOverlay;

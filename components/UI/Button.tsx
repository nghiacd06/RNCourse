import { Pressable, StyleSheet, Text, TextProps } from "react-native";
import { Colors } from "../../constants/globalStyles";

type ButtonProps = {
  children: TextProps["children"];
  onPress: () => void;
};

const Button = ({ onPress, children }: ButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    // justifyContent: "center",
    // alignItems: "center",
    // borderColor: Colors.primary800,
    borderWidth: 4,

    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.primary50,
  },
});

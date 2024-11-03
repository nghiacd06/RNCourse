import { Ionicons } from "@expo/vector-icons";
import {
  ColorValue,
  Pressable,
  StyleSheet,
  Text,
  TextProps,
} from "react-native";
import { Colors } from "../../constants/globalStyles";

type IoniconsNameProps = keyof typeof Ionicons.glyphMap;

type OutlineButtonProps = {
  children: TextProps["children"];
  icon: IoniconsNameProps;
  onPress: () => void;
};

const OutlineButton = ({ icon, onPress, children }: OutlineButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={18}
        color={Colors.primary500}
        style={styles.icon}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default OutlineButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.primary500,
    borderWidth: 2,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: Colors.primary500,
  },
});

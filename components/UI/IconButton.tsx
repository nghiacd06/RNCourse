import { Ionicons } from "@expo/vector-icons";
import { ColorValue, Pressable, StyleSheet } from "react-native";

type IoniconsNameProps = keyof typeof Ionicons.glyphMap;

type IconButtonProps = {
  icon: IoniconsNameProps;
  size: number;
  color: ColorValue;
  onPress: () => void;
};

const IconButton = ({ icon, size, color, onPress }: IconButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={size}
        color={color}
      />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});

import { Pressable, ColorValue, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type IoniconsNameProps = keyof typeof Ionicons.glyphMap;

type IconButtonProps = {
  icon: IoniconsNameProps;
  color: ColorValue;
  onPress: () => void;
};

const IconButton = ({ icon, color, onPress }: IconButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Ionicons
        name={icon}
        size={24}
        color={color}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.6,
  },
});

export default IconButton;

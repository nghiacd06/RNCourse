import { Ionicons } from "@expo/vector-icons";
import { ColorValue, Pressable, StyleSheet, View } from "react-native";

type IoniconsNameProps = keyof typeof Ionicons.glyphMap;

export type IconButtonProps = {
  icon: IoniconsNameProps;
  size: number;
  color: ColorValue;
  onPress?: () => void;
};

const IconButton = ({ icon, size, color, onPress }: IconButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <Ionicons
          name={icon}
          size={size}
          color={color}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default IconButton;
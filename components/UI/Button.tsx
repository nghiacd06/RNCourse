import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  View,
  ViewStyle,
} from "react-native";
import { globalStyles } from "../../constants/styles";

export type CustomButtonProps = {
  children: TextProps["children"];
  mode?: "flat" | "default";
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

const CustomButton = ({
  children,
  mode = "default",
  style,
  onPress,
}: CustomButtonProps) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: globalStyles.colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  flat: {
    backgroundColor: "transparent",
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  flatText: {
    color: globalStyles.colors.primary100,
  },
  pressed: {
    opacity: 0.7,
  },
});

export default CustomButton;

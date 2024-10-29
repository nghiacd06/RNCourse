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
    padding: 8,
    backgroundColor: globalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: globalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: globalStyles.colors.primary100,
    borderRadius: 6,
  },
});

export default CustomButton;

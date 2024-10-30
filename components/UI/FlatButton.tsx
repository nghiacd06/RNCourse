import { Pressable, StyleSheet, Text, TextProps, View } from "react-native";

import { globalStyles } from "../../constants/styles";

type FlatButtonProps = {
  children: TextProps["children"];
  onPress: () => void;
};

const FlatButton = ({ children, onPress }: FlatButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    color: globalStyles.colors.primary100,
  },
});

import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

type PrimaryButtonProps = {
  children: React.ReactNode | undefined;
  onPress: () => void;
};

const PrimaryButton = ({ children, onPress }: PrimaryButtonProps) => {
  return (
    <View style={styles.outerContainer}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) =>
          pressed
            ? [styles.innerContainer, styles.pressed]
            : styles.innerContainer
        }
        android_ripple={{ color: Colors.primary500 }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: Colors.primary400,
    margin: 4,
  },
  innerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});

export default PrimaryButton;

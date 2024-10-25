import { StyleSheet, Text, Platform } from "react-native";

type TitleProps = {
  children: React.ReactNode | undefined;
};

const Title = ({ children }: TitleProps) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    // borderWidth: Platform.OS === "android" ? 2 : 0,
    borderWidth: Platform.select({
      android: 4,
      ios: 0,
      default: 2,
    }),
    borderColor: "white",
    textAlign: "center",
    padding: 8,
  },
});

export default Title;

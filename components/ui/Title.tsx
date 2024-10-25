import { StyleSheet, Text } from "react-native";

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
    borderWidth: 4,
    borderColor: "white",
    textAlign: "center",
    padding: 8,
  },
});

export default Title;

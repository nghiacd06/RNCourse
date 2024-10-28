import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import Meal from "../../models/meal";
import { PropsWithChildren } from "react";

type SubTitleProps = PropsWithChildren<{}>;

const SubTitle = ({ children }: SubTitleProps) => {
  return (
    <View style={styles.subTitleContainer}>
      <Text style={styles.subTitle}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  subTitleContainer: {
    margin: 4,
    padding: 6,
    borderBottomWidth: 2,
    borderBottomColor: "white",
    marginHorizontal: 24,
  },
  subTitle: {
    color: "#b1923e",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});

export default SubTitle;

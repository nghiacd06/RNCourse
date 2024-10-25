import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../../constants/colors";

type CardProps = PropsWithChildren<{}>;

const Card = ({ children }: CardProps) => {
  return <View style={styles.cardContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary500,
    padding: 16,
    marginHorizontal: 24,
    marginTop: 36,
    borderRadius: 8,
    // shadows - Android
    elevation: 4,
    // shadows - iOS
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.5,
  },
});

export default Card;

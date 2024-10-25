import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

type GuessLogItemProps = {
  roundNumber: number;
  guess: number;
};

const GuessLogItem = ({ roundNumber, guess }: GuessLogItemProps) => {
  return (
    <View style={styles.itemContainer}>
      <Text>#{roundNumber}</Text>
      <Text>Opponent's Guess: {guess}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 40,
    borderColor: Colors.primary400,
    borderWidth: 1,
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.accent500,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",

    // shadows - Android
    elevation: 4,
    // shadows - iOS
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 3,
    shadowOpacity: 0.25,
  },
  itemText: {
    fontFamily: "open-sans",
  },
});

export default GuessLogItem;

import { View, Text, StyleSheet, Alert, FlatList } from "react-native";
import Title from "../components/ui/Title";
import { useEffect, useState } from "react";
import generateRandomBetween from "../utils/generateRandomBetween";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import InstructionText from "../components/ui/InstructionText";
import Card from "../components/ui/Card";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

type GameScreenProps = {
  userNumber: number;
  onGameOver: (guessRoundsLength: number) => void;
};

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }: GameScreenProps) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
  const [guessRounds, setGuessRounds] = useState<number[]>([initialGuess]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;

    return () => {
      minBoundary = 1;
      maxBoundary = 100;
    };
  }, []);

  useEffect(() => {
    if (userNumber === currentGuess) {
      onGameOver(guessRounds.length);
    }
  }, [userNumber, currentGuess, onGameOver, guessRounds]);

  const nexGuessHandler = (direction: "lower" | "greater") => {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong..", [
        {
          text: "Sorry",
          style: "cancel",
        },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newGuess = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newGuess);
    setGuessRounds((prev) => [newGuess, ...prev]);
  };

  const guessRoundListLength = guessRounds.length;

  return (
    <View style={styles.container}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nexGuessHandler.bind(this, "lower")}>
              <Ionicons
                name="remove"
                size={24}
              />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nexGuessHandler.bind(this, "greater")}>
              <Ionicons
                name="add"
                size={24}
              />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.guessListContainer}>
        {/* {guessRounds.map((item) => (
          <Text key={item}>{item}</Text>
        ))} */}
        <FlatList
          data={guessRounds}
          renderItem={({ item, index }) => (
            <GuessLogItem
              guess={item}
              roundNumber={guessRoundListLength - index}
            />
          )}
          keyExtractor={(item) => `${item}`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  instructionText: {
    marginBottom: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  guessListContainer: {
    marginTop: 24,
  },
});

export default GameScreen;

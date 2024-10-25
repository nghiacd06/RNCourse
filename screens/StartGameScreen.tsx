import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Alert,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import InstructionText from "../components/ui/InstructionText";
import Card from "../components/ui/Card";

type StartGameScreenProps = {
  onPickNumber: (number: number) => void;
};

const StartGameScreen = ({ onPickNumber }: StartGameScreenProps) => {
  const [enteredNumber, setEnteredNumber] = useState<string>("");

  const onChangeText = (text: string) => {
    setEnteredNumber(text);
  };

  const onReset = () => {
    setEnteredNumber("");
  };

  const onConfirm = () => {
    const convertedNumber = parseInt(enteredNumber);

    if (isNaN(convertedNumber) || convertedNumber < 0 || convertedNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 to 99.",
        [{ text: "Okay", style: "destructive", onPress: onReset }]
      );
      return;
    }

    onPickNumber(convertedNumber);
  };

  return (
    <View style={styles.container}>
      <Title>Guest my number</Title>
      <Card>
        <InstructionText>Enter a number</InstructionText>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          value={enteredNumber}
          onChangeText={onChangeText}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={onReset}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={onConfirm}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  numberInput: {
    padding: 8,
    height: 50,
    width: 60,
    fontSize: 32,
    fontWeight: "bold",
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    textAlign: "center",
    alignSelf: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});

export default StartGameScreen;

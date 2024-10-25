import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

type GameOverScreenProps = {
  userNumber: number;
  guessRounds: number;
  onStartNewGame: () => void;
};

const GameOverScreen = ({
  userNumber,
  guessRounds,
  onStartNewGame,
}: GameOverScreenProps) => {
  const { width, height } = useWindowDimensions();

  let imageSize = 300;

  if (width < 380 || height < 420) {
    imageSize = 150;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView
      style={styles.screen}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Title>GAME OVER!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            source={require("../assets/success.png")}
            style={styles.image}
          />
        </View>
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlight}>{guessRounds}</Text>{" "}
          rounds to guess the number{" "}
          <Text style={styles.highlight}>{userNumber}</Text>.
        </Text>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    // borderRadius: deviceWidth < 380 ? 100 : 150,
    // width: deviceWidth < 380 ? 200 : 300,
    // height: deviceWidth < 380 ? 200 : 300,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: Colors.primary500,
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});

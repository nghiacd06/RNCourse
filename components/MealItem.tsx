import {
  Pressable,
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import Meal from "../models/meal";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import MealDetails from "./MealDetails";

type MealItemProps = {
  data: Meal;
};

const MealItem = ({ data }: MealItemProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { imageUrl, title, complexity, duration, affordability } = data;

  const onNavigateToMealDetails = () => {
    navigation.navigate("MealDetails", { mealId: data.id });
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onNavigateToMealDetails}
        android_ripple={{ color: "#cccccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
      >
        <View style={styles.innerContainer}>
          <View>
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
            />
            <Text style={styles.title}>{title}</Text>
          </View>
          <MealDetails data={data} />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 8,
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  innerContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    margin: 8,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
});

export default MealItem;

import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { MEALS } from "../data/dummy-data";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Meal from "../models/meal";
import { RootStackParamList } from "../App";
import { useLayoutEffect } from "react";
import MealDetails from "../components/MealDetails";
import SubTitle from "../components/MealDetail/SubTitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";

type MealsOverviewRouteParams = { mealId: string };

const MealDetailsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route =
    useRoute<RouteProp<{ params: MealsOverviewRouteParams }, "params">>();
  const mealId = route.params.mealId;

  const mealData: Meal | undefined = MEALS.find((item) => item.id === mealId);

  const onHeaderButtonPressed = () => {
    console.log("Pressed!");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: mealData?.title,
      headerRight: () => (
        <IconButton
          onPress={onHeaderButtonPressed}
          icon="star"
          color="white"
        />
      ),
    });

    return () => {
      // TODO
    };
  }, [mealData, navigation, onHeaderButtonPressed]);

  return mealData ? (
    <ScrollView style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: mealData?.imageUrl }}
      />
      <Text style={styles.title}>{mealData?.title}</Text>
      <MealDetails
        data={mealData}
        textStyle={styles.detailText}
      />

      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <SubTitle>Ingredients:</SubTitle>
          <List data={mealData?.ingredients ?? []} />
          <SubTitle>Steps:</SubTitle>
          <List data={mealData?.steps ?? []} />
        </View>
      </View>
    </ScrollView>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 36,
  },
  image: {
    width: "100%",
    height: 300,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
    margin: 8,
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});

export default MealDetailsScreen;

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Meal from "../models/meal";
import { RootStackParamList } from "../App";
import { useLayoutEffect } from "react";
import MealsList from "../components/MealsList/MealsList";

type MealsOverviewRouteParams = { categoryId: string };

const MealsOverviewScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route =
    useRoute<RouteProp<{ params: MealsOverviewRouteParams }, "params">>();
  const categoryId = route.params.categoryId;

  const meals = MEALS.filter((item) => item.categoryIds.includes(categoryId));

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (item) => item.id === categoryId
    )?.title;

    navigation.setOptions({
      title: categoryTitle,
    });

    return () => {
      // TODO
    };
  }, [categoryId, navigation]);

  return <MealsList meals={meals} />;
};

const styles = StyleSheet.create({});

export default MealsOverviewScreen;

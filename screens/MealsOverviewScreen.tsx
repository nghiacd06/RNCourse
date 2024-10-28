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
import MealItem from "../components/MealItem";
import Meal from "../models/meal";
import { RootStackParamList } from "../App";
import { useLayoutEffect } from "react";

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

  const renderMealItem = (itemData: ListRenderItemInfo<Meal>) => {
    return <MealItem data={itemData.item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default MealsOverviewScreen;

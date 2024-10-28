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
import { useContext, useLayoutEffect } from "react";
import MealDetails from "../components/MealDetails";
import SubTitle from "../components/MealDetail/SubTitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/redux/store";
import { addFavorite, removeFavorite } from "../store/redux/slices/favorite";
// import { FavoritesContext } from "../store/context/favorites-context";

type MealsOverviewRouteParams = { mealId: string };

const MealDetailsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route =
    useRoute<RouteProp<{ params: MealsOverviewRouteParams }, "params">>();
  const mealId = route.params.mealId;

  const dispatch = useDispatch<AppDispatch>();

  /// --- with Context
  // const {
  //   ids: favoriteMealIds,
  //   addFavorite,
  //   removeFavorite,
  // } = useContext(FavoritesContext);

  /// --- with Redux
  const { ids: favoriteMealIds } = useSelector(
    (state: RootState) => state.favoriteMeals
  );

  const mealData: Meal | undefined = MEALS.find((item) => item.id === mealId);

  const isFavoriteMeal = favoriteMealIds.includes(mealId);

  const onChangeFavoriteStatus = () => {
    /// --- with Context
    // if (isFavoriteMeal) {
    //   removeFavorite(mealId);
    //   return;
    // }

    // addFavorite(mealId);

    /// --- with Redux
    if (isFavoriteMeal) {
      dispatch(removeFavorite(mealId));
      return;
    }

    dispatch(addFavorite(mealId));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: mealData?.title,
      headerRight: () => (
        <IconButton
          onPress={onChangeFavoriteStatus}
          icon={isFavoriteMeal ? "star" : "star-outline"}
          color="white"
        />
      ),
    });

    return () => {
      // TODO
    };
  }, [mealData, navigation, onChangeFavoriteStatus, isFavoriteMeal]);

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

import { View, Text, StyleSheet } from "react-native";
import { MEALS } from "../data/dummy-data";
import { useContext } from "react";
import { FavoritesContext } from "../store/context/favorites-context";
import MealsList from "../components/MealsList/MealsList";
import { useSelector } from "react-redux";
import { RootState } from "../store/redux/store";

const FavoriteScreen = () => {
  /// --- with Context
  // const { ids: favoriteMealIds } = useContext(FavoritesContext);

  /// --- with Redux
  const { ids: favoriteMealIds } = useSelector(
    (state: RootState) => state.favoriteMeals
  );

  const favoriteMeals = MEALS.filter((item) =>
    favoriteMealIds.includes(item.id)
  );

  if (!favoriteMeals.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You no have favorite meals here.</Text>
      </View>
    );
  }

  return <MealsList meals={favoriteMeals} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default FavoriteScreen;

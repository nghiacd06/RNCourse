import { StyleSheet, View, FlatList, ListRenderItemInfo } from "react-native";
import Meal from "../../models/meal";
import MealItem from "./MealItem";
export type MealsListProps = {
  meals: Meal[];
};

const MealsList = ({ meals }: MealsListProps) => {
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

export default MealsList;

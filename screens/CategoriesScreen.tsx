import { FlatList, ListRenderItemInfo, View } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import Category from "../models/category";
import CategoryGridTitle from "../components/CategoryGridTitle";
import { RootStackParamList } from "../App";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const CategoriesScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const renderCategoryItem = (itemData: ListRenderItemInfo<Category>) => {
    const onPress = () => {
      navigation.navigate("MealsOverview", {
        categoryId: itemData.item.id,
      });
    };

    return (
      <CategoryGridTitle
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={onPress}
      />
    );
  };
  return (
    <FlatList
      key={"_"}
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
};

export default CategoriesScreen;

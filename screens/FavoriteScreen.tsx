import { FlatList, ListRenderItemInfo, View, Text } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import Category from "../models/category";
import CategoryGridTitle from "../components/CategoryGridTitle";
import { RootStackParamList } from "../App";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const FavoriteScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View>
      <Text>Favorite</Text>
    </View>
  );
};

export default FavoriteScreen;

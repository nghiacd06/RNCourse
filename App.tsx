import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import CategoriesScreen from "./screens/CategoriesScreen";
import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailsScreen from "./screens/MealDetailsScreen";

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  MealsCategories: undefined;
  MealsOverview: { categoryId: string };
  MealDetails: { mealId: string };
};

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#d4a31c",
            },
            headerTintColor: "white",
            contentStyle: {
              backgroundColor: "#392b03",
            },
          }}
        >
          <Stack.Screen
            name="MealsCategories"
            component={CategoriesScreen}
            options={{
              title: "Meals Categories",
            }}
          />
          <Stack.Screen
            name="MealsOverview"
            component={MealsOverviewScreen}
            // can set options by this way instead navigate.setOptions()
            options={({ route, navigation }: any) => {
              return {
                headerBackTitle: "Back",
              };
            }}
          />
          <Stack.Screen
            name="MealDetails"
            component={MealDetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});

import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import CategoriesScreen from "./screens/CategoriesScreen";
import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailsScreen from "./screens/MealDetailsScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import FavoritesContextProvider from "./store/context/favorites-context";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#d4a31c",
        },
        headerTintColor: "white",
        sceneContainerStyle: {
          backgroundColor: "#392b03",
        },
        drawerContentStyle: {
          backgroundColor: "#392b03",
        },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#392b03",
        drawerActiveBackgroundColor: "#6d5718",
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          headerTitle: "All Categories",
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="list"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          headerTitle: "About the Meal",
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="star"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export type RootStackParamList = {
  MealsCategories: undefined;
  MealsOverview: { categoryId: string };
  MealDetails: { mealId: string };
};

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <FavoritesContextProvider>
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
              name="Drawer"
              component={DrawerNavigator}
              options={{
                // title: "Meals Categories",
                headerShown: false,
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
      </FavoritesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({});

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  CompositeNavigationProp,
  NavigationContainer,
  RouteProp,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";

import { globalStyles } from "./constants/styles";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expenses-context";

export type RootStackNavigationParamList = {
  ExpenseOverview: undefined;
  ManageExpense: { expenseId: string } | undefined;
};

export type BottomTabNavigationParamList = {
  RecentExpense: undefined;
  AllExpenses: undefined;
};

export type CombinedNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackNavigationParamList>,
  BottomTabNavigationProp<BottomTabNavigationParamList>
>;

const Stack = createNativeStackNavigator<RootStackNavigationParamList>();
const BottomTabs = createBottomTabNavigator<BottomTabNavigationParamList>();

const ExpenseOverview = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({
        route,
        navigation,
      }: {
        route: RouteProp<
          BottomTabNavigationParamList,
          keyof BottomTabNavigationParamList
        >;
        navigation: CombinedNavigationProp;
      }) => ({
        headerStyle: {
          backgroundColor: globalStyles.colors.primary500,
        },
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: globalStyles.colors.primary500,
        },
        tabBarActiveTintColor: globalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor ?? "white"}
            onPress={() => {
              console.log("aaa");

              return navigation.navigate("ManageExpense");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentExpense"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              color={color}
              size={size}
              name="hourglass"
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              color={color}
              size={size}
              name="home"
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: globalStyles.colors.primary500,
              },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="ExpenseOverview"
              component={ExpenseOverview}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({});

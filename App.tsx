import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/globalStyles";
import Map from "./screens/Map";
import { Place } from "./models/place";
import { useEffect, useState } from "react";
import { init } from "./utils/database";
import AppLoading from "expo-app-loading";

export type RootStackNavigationParamList = {
  AllPlaces: undefined;
  AddPlace: { pickedLat: number; pickedLng: number } | undefined;
  Map: { initialLat: number; initialLng: number } | undefined;
  PlaceDetails: { placeId: string };
};

const Stack = createNativeStackNavigator<RootStackNavigationParamList>();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState<boolean>(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }

  const onAddPlace = () => {};

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            headerTintColor: Colors.gray700,
            contentStyle: {
              backgroundColor: Colors.gray700,
            },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({
              navigation,
            }: {
              navigation: NativeStackNavigationProp<RootStackNavigationParamList>;
            }) => ({
              title: "Your favorite places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  color={tintColor ?? "white"}
                  size={24}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "Add a new Place",
            }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{
              title: "Map view",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

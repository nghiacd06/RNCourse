import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

import { globalStyles } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useContext, useEffect, useState } from "react";
import IconButton from "./components/UI/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingOverlay from "./components/UI/LoadingOverlay";
import AppLoading from "expo-app-loading";

export type RootStackNavigationParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<RootStackNavigationParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: globalStyles.colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: globalStyles.colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
      />
    </Stack.Navigator>
  );
};

const AuthenticatedStack = () => {
  const { logOut } = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: globalStyles.colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: globalStyles.colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor ?? "white"}
              size={24}
              onPress={logOut}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthStack />}
      {isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
};

const Root = () => {
  const { authenticate } = useContext(AuthContext);
  const [isTryingLogin, setIsTryingLogin] = useState<boolean>(true);

  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authenticate(storedToken);
      }

      setIsTryingLogin(false);
    };

    getToken();
  }, []);

  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({});

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth-context";

const WelcomeScreen = () => {
  const { token } = useContext(AuthContext);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    axios
      .get(
        `https://rncourse-30376-default-rtdb.firebaseio.com/message.json?auth=${token}`
      )
      .then((res) => {
        setMessage(res.data);
      });
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{message}</Text>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

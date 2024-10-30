import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import Button from "../UI/Button";
import AuthForm from "./AuthForm";
import { globalStyles } from "../../constants/styles";
import { Credentials } from "../../types";

type AuthContentProps = {
  isLogin?: boolean;
  onAuthenticate?: ({
    email,
    password,
  }: Pick<Credentials, "email" | "password">) => void;
};

const AuthContent = ({ isLogin, onAuthenticate }: AuthContentProps) => {
  const [credentialsInvalid, setCredentialsInvalid] = useState<
    Record<keyof Credentials, boolean>
  >({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    // Todo
  }

  function submitHandler(credentials: Credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate?.({ email, password });
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <Button
          mode="flat"
          onPress={switchAuthModeHandler}
        >
          {isLogin ? "Create a new user" : "Log in instead"}
        </Button>
      </View>
    </View>
  );
};

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: globalStyles.colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});

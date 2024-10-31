import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { Credentials } from "../types";
import { createUser } from "../utils/auth";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

const SignUpScreen = () => {
  const { authenticate } = useContext(AuthContext);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  const handleSignUp = async (
    data: Pick<Credentials, "email" | "password">
  ) => {
    setIsAuthenticating(true);
    try {
      const token = await createUser(data);
      authenticate(token);
    } catch (error) {
      Alert.alert("Register failed!");
    }
    setIsAuthenticating(false);
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={handleSignUp} />;
};

export default SignUpScreen;

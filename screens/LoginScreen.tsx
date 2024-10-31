import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { Credentials } from "../types";
import { login } from "../utils/auth";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

const LoginScreen = () => {
  const { authenticate } = useContext(AuthContext);

  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  const handleLogin = async (data: Pick<Credentials, "email" | "password">) => {
    setIsAuthenticating(true);
    try {
      const token = await login(data);
      authenticate(token);
    } catch (error) {
      Alert.alert("Login failed!");
    }
    setIsAuthenticating(false);
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <AuthContent
      isLogin
      onAuthenticate={handleLogin}
    />
  );
};

export default LoginScreen;

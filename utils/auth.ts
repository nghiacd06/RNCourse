import axios from "axios";
import { Credentials } from "../types";

const API_KEY = "AIzaSyAWhrAma5JJkGqUd-xqhwFNPuAxpGoDHEY";

const authenticate = async (
  mode: "signUp" | "signInWithPassword",
  { email, password }: Pick<Credentials, "email" | "password">
) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const res = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  const token = res.data.idToken;

  return token;
};

const createUser = (data: Pick<Credentials, "email" | "password">) => {
  return authenticate("signUp", data);
};

const login = (data: Pick<Credentials, "email" | "password">) => {
  return authenticate("signInWithPassword", data);
};

export { createUser, login };

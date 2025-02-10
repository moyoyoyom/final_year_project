import { useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthenticationScreen from "../view/UI/layout/generalScreen/AuthenticationScreen";
import { saveUserToken } from "../model/UserTokenStorage";

const LoginScreenPresenter = ({ navigation }) => {
  //Initialisations
  const authenticationType = "Login";

  const loginEndpoint = "http://192.168.1.253:8090/api/users/login";

  //State
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  //Handlers
  const onPageSwitch = () => {
    navigation.navigate("CreateAccountScreen");
  };

  const postLoginOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: usernameValue, password: passwordValue }),
  };

  const postLogin = async () => {
    try {
      const response = await fetch(loginEndpoint, postLoginOptions);
      const data = JSON.parse(await response.text());
      if (response.ok) {
        await AsyncStorage.setItem("userToken", data.userToken);
        const storedToken = await AsyncStorage.getItem("userToken");
        console.log("Stored token:", storedToken);
        saveUserToken(storedToken);
        navigation.replace("SearchScreen");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", error.message);
    }
  };

  //View
  return (
    <AuthenticationScreen
      usernameValue={usernameValue}
      passwordValue={passwordValue}
      onUsernameChange={setUsernameValue}
      onPasswordChange={setPasswordValue}
      onPageSwitch={onPageSwitch}
      onAuthenticateClick={postLogin}
      type={authenticationType}
    />
  );
};

export default LoginScreenPresenter;

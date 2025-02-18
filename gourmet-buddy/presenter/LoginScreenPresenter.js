import { useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthenticationScreen from "../view/UI/layout/generalScreen/AuthenticationScreen";
import { saveUserToken } from "../model/UserTokenStorage";

const LoginScreenPresenter = ({ navigation }) => {
  //Initialisations
  const authenticationType = "Login";

  const loginEndpoint =
    "http://gourmet-buddy-app.eu-west-2.elasticbeanstalk.com/api/users/login";
  const postLoginOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: usernameValue, password: passwordValue }),
  };

  //State
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  //Handlers
  const onPageSwitch = () => {
    navigation.navigate("CreateAccountScreen");
  };

  const getUsername = (value) => {
    setUsernameValue(value);
  };

  const getPassword = (value) => {
    setPasswordValue(value);
  };

  const postLogin = async () => {
    try {
      const response = await fetch(loginEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameValue,
          password: passwordValue,
        }),
      });
      const data = JSON.parse(await response.text());
      if (response.ok) {
        await AsyncStorage.setItem("userToken", data.userToken);
        const storedToken = await AsyncStorage.getItem("userToken");
        console.log("Stored token:", storedToken);
        saveUserToken(storedToken);
        navigation.replace("SearchScreen");
      } else {
        Alert.alert("Your credentials are incorrect");
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
      onUsernameChange={getUsername}
      onPasswordChange={getPassword}
      onPageSwitch={onPageSwitch}
      onAuthenticateClick={postLogin}
      type={authenticationType}
    />
  );
};

export default LoginScreenPresenter;

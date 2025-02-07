import { useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthenticationScreen from "../view/UI/layout/generalScreen/AuthenticationScreen";

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

  postLoginOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: usernameValue, password: passwordValue }),
  };

  const postLogin = async () => {
    try {
      await fetch(loginEndpoint, postLoginOptions).then((response) => {
        response.json().then(() => {
          if (response.status < 400) {
            AsyncStorage.setItem("isUserLoggedIn".JSON.stringify(true));
            navigation.navigate("SearchScreen");
          } else {
            Alert.alert(
              "Unable to log in. Please ensure your credentials are correct"
            );
          }
        });
      });
    } catch (error) {
      Alert.alert(error);
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

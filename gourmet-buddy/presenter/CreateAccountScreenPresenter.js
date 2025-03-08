import { Alert } from "react-native";
import { useState } from "react";

import AuthenticationScreen from "../view/UI/layout/generalScreen/AuthenticationScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveUserToken } from "../model/UserTokenStorage";

const CreateAccountScreenPresenter = ({ navigation }) => {
  //Initialisations
  const authenticationType = "SignUp";

  const userEndpoint =
    "http://gourmet-buddy-app.eu-west-2.elasticbeanstalk.com/api/users/account";

  //State
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  //Handlers
  const postUserOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: usernameValue, password: passwordValue }),
  };

  const postNewUser = async () => {
    try {
      const response = await fetch(userEndpoint, postUserOptions);
      const data = JSON.parse(await response.text());
      if (response.ok) {
        await AsyncStorage.setItem("userToken", data.userToken);
        const storedToken = await AsyncStorage.getItem("userToken");
        saveUserToken(storedToken);
        navigation.navigate("IntoleranceProfileScreen");
      }
    } catch (error) {
      console.error("Account creation error:", error);
      Alert.alert("Error", error.message);
    }
  };

  const getUsername = (value) => {
    setUsernameValue(value);
  };

  const getPassword = (value) => {
    setPasswordValue(value);
  };

  const onPageSwitch = () => {
    navigation.navigate("LoginScreen");
  };

  //View
  return (
    <AuthenticationScreen
      usernameValue={usernameValue}
      passwordValue={passwordValue}
      onUsernameChange={getUsername}
      onPasswordChange={getPassword}
      onAuthenticateClick={postNewUser}
      onPageSwitch={onPageSwitch}
      type={authenticationType}
    />
  );
};

export default CreateAccountScreenPresenter;

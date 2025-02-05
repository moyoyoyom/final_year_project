import { Alert } from "react-native";
import { useState } from "react";

import AuthenticationScreen from "../view/UI/layout/generalScreen/AuthenticationScreen";

const CreateAccountScreenPresenter = ({ navigation }) => {
  //Initialisations
  const authenticationType = "SignUp";

  const userEndpoint = "http://192.168.1.253:8090/api/users/account";

  //State
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  //Handlers
  const postUserOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: usernameValue, password: passwordValue }),
  };

  const postUser = async () => {
    try {
      await fetch(userEndpoint, postUserOptions).then((response) => {
        response.json().then(() => {
          navigation.navigate("SearchScreen");
        });
      });
    } catch (error) {
      Alert.alert(error);
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
      onAuthenticateClick={postUser}
      onPageSwitch={onPageSwitch}
      type={authenticationType}
    />
  );
};

export default CreateAccountScreenPresenter;

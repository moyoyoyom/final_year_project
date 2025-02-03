import { useState } from "react";
import API from "../model/API";

import CreateAccountScreen from "../view/screens/CreateAccountScreen";
import { Alert } from "react-native";

const CreateAccountScreenPresenter = ({ navigation }) => {
  //Initialisations
  const userEndpoint = "http://192.168.1.253:8090/api/users/account";

  //State
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  //Handlers
  const handleSignUp = async () => {
    const enteredUsername = usernameValue;
    const enteredPassword = passwordValue;
    const result = await API.post(userEndpoint, {
      enteredUsername,
      enteredPassword,
    });
    if (result.isSuccess) {
      console.log(" a new user has been added");
    } else Alert.alert(result.message);
  };

  const postUserOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: usernameValue, password: passwordValue }),
  };

  const postUser = async () => {
    try {
      await fetch(userEndpoint, postUserOptions).then((response) => {
        response.json().then((data) => {
          navigation.navigate("SearchScreen");
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getUsername = (value) => {
    setUsernameValue(value);
  };

  const getPassword = (value) => {
    setPasswordValue(value);
  };

  //View
  return (
    <CreateAccountScreen
      usernameValue={usernameValue}
      passwordValue={passwordValue}
      onUsernameChange={getUsername}
      onPasswordChange={getPassword}
      onSignUpClick={postUser}
    />
  );
};

export default CreateAccountScreenPresenter;

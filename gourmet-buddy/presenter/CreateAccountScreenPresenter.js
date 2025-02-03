import { useState } from "react";
import API from "../model/API";

import CreateAccountScreen from "../view/screens/CreateAccountScreen";
import { Alert } from "react-native";

const CreateAccountScreenPresenter = () => {
  //Initialisations
  const userEndpoint = "http://localhost:8090/api/users/account";

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
      onSignUpClick={handleSignUp}
    />
  );
};

export default CreateAccountScreenPresenter;

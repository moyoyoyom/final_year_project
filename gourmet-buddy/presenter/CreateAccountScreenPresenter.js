import { useState } from "react";

import CreateAccountScreen from "../view/screens/CreateAccountScreen";

const CreateAccountScreenPresenter = () => {
  //State
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  //Handlers
  const handleSubmit = () => {
    const enteredUsername = getUsername;
    const enteredPassword = getPassword;
    console.log(enteredUsername);
    console.log(enteredPassword);
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
    />
  );
};

export default CreateAccountScreenPresenter;

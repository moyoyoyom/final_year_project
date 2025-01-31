import { useState } from "react";

import CreateAccountScreen from "../view/screens/CreateAccountScreen";

const CreateAccountScreenPresenter = () => {
  //State
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  //Handlers
  const handleSignUp = () => {
    const enteredUsername = usernameValue;
    const enteredPassword = passwordValue;
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
      onSignUpClick={handleSignUp}
    />
  );
};

export default CreateAccountScreenPresenter;

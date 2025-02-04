import { useState } from "react";

import AuthenticationScreen from "../view/UI/layout/generalScreen/AuthenticationScreen";

const LoginScreenPresenter = ({ navigation }) => {
  //Initialisations
  const authenticationType = "Login";

  //State
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  //Handlers
  const onPageSwitch = () => {
    navigation.navigate("CreateAccountScreen");
  };

  //View
  return (
    <AuthenticationScreen
      usernameValue={usernameValue}
      passwordValue={passwordValue}
      onUsernameChange={setUsernameValue}
      onPasswordChange={setPasswordValue}
      onPageSwitch={onPageSwitch}
      type={authenticationType}
    />
  );
};

export default LoginScreenPresenter;

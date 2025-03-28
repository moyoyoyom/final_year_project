import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthenticationScreen from "../view/UI/layout/generalScreen/AuthenticationScreen";
import { AuthenticationContext } from "../model/AuthenicationContext";
import API from "../model/API";

const LoginScreenPresenter = ({ navigation }) => {
  //Initialisations
  const { loginUser } = useContext(AuthenticationContext);
  const authenticationType = "Login";

  const loginEndpoint = "http://192.168.1.253:8090/api/users/login";
  //"http://gourmet-buddy-app.eu-west-2.elasticbeanstalk.com/api/users/login";

  //For testing: http://192.168.1.253:8090/
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
    const response = await API.post(loginEndpoint, {
      username: usernameValue,
      password: passwordValue,
    });
    if (response.isSuccess) {
      const token = response.result.userToken;
      loginUser(token);
      navigation.replace("AppStack");
    } else {
      Alert.alert("Your credentials are incorrect");
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

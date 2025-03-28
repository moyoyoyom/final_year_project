import ProfileScreen from "../view/screens/ProfileScreen";
import { useContext } from "react";
import { AuthenticationContext } from "../model/AuthenicationContext";

const ProfileScreenPresenter = ({ navigation }) => {
  //Initialisations
  const { logOutUser } = useContext(AuthenticationContext);
  //Handlers
  const onLogoutPress = () => {
    logOutUser();
    navigation.replace("AuthenticationStack", { screen: "LoginScreen" });
  };

  //View
  return <ProfileScreen onLogoutPress={onLogoutPress} />;
};

export default ProfileScreenPresenter;

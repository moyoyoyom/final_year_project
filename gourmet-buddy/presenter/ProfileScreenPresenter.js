import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileScreen from "../view/screens/ProfileScreen";

const ProfileScreenPresenter = ({ navigation }) => {
  //Handlers
  const onLogoutPress = () => {
    AsyncStorage.removeItem("userToken");
    navigation.navigate("LoginScreen");
  };

  //View
  return <ProfileScreen onLogoutPress={onLogoutPress} />;
};

export default ProfileScreenPresenter;

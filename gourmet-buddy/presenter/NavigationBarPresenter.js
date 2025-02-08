import { useNavigation } from "@react-navigation/native";
import NavigationBar from "../view/UI/components/NavigationBar";

const NavigationBarPresenter = () => {
  //Initialisations
  const navigation = useNavigation();

  //Handlers
  const handleExploreClick = () => {
    navigation.navigate("ExploreScreen");
  };
  const handleSearchClick = () => {
    navigation.navigate("SearchScreen");
  };
  const handleProfileClick = () => {
    navigation.navigate("ProfileScreen");
  };

  //View
  return (
    <NavigationBar
      onExplorePress={handleExploreClick}
      onSearchPress={handleSearchClick}
      onProfilePress={handleProfileClick}
    />
  );
};

export default NavigationBarPresenter;

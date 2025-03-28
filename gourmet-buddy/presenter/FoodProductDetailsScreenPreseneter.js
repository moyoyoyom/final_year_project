import { useContext } from "react";
import FoodProductDetailsScreen from "../view/screens/FoodProductDetailsScreen";
import { AuthenticationContext } from "../model/AuthenicationContext";
import useLoad from "../model/useLoad";
import LoadingScreen from "../view/screens/LoadingScreen";

const FoodProductDetailsScreenPresenter = ({ navigation, route }) => {
  //Initialisations
  const { user } = useContext(AuthenticationContext);
  console.log(user.userID);
  const { foodProduct } = route.params;
  const userSensitivitiesEndpoint = `http://192.168.1.253:8090/api/relationships/cannoteat/${user.userID}`;

  //State
  const [userSensitivities] = useLoad(userSensitivitiesEndpoint);
  console.log(userSensitivities);

  const formattedSensitivities = userSensitivities.result.map(
    (trigger) => trigger.triggerName
  );

  //Handlers
  const handleBackClick = () => {
    navigation.navigate("SearchScreen");
  };

  if (!decodedUser) {
    return <LoadingScreen />;
  }

  //View
  return (
    <FoodProductDetailsScreen
      foodProduct={foodProduct}
      userSensitivities={formattedSensitivities}
      onBackClick={handleBackClick}
    />
  );
};

export default FoodProductDetailsScreenPresenter;

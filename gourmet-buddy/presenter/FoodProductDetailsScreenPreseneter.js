import { useContext } from "react";
import FoodProductDetailsScreen from "../view/screens/FoodProductDetailsScreen";
import { jwtDecode } from "jwt-decode";
import { AuthenticationContext } from "../model/AuthenicationContext";
import useLoad from "../model/useLoad";
import LoadingScreen from "../view/screens/LoadingScreen";

const FoodProductDetailsScreenPresenter = ({ navigation, route }) => {
  //Initialisations
  const { user } = useContext(AuthenticationContext);
  const { foodProduct } = route.params;
  const decodedUser = jwtDecode(JSON.stringify(user));
  const userSensitivitiesEndpoint = `http://192.168.1.253:8090/api/relationships/cannoteat/${decodedUser.userID}`;

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

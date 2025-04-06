import { useContext } from "react";
import FoodProductDetailsScreen from "../view/screens/FoodProductDetailsScreen";
import { AuthenticationContext } from "../model/AuthenicationContext";
import useLoad from "../model/useLoad";
import API from "../model/API";

const FoodProductDetailsScreenPresenter = ({ navigation, route }) => {
  //Initialisations
  const { user } = useContext(AuthenticationContext);
  const { foodProduct } = route.params;
  const userSensitivitiesEndpoint = `http://192.168.1.253:8090/api/relationships/cannoteat/${user.userID}`;

  //State
  const [userSensitivities, isUserSensitivitiesLoading] = useLoad(
    userSensitivitiesEndpoint
  );

  if (isUserSensitivitiesLoading) return;
  console.log(userSensitivities);

  const formattedSensitivities = userSensitivities.map(
    (trigger) => trigger.triggerName
  );

  //Handlers
  const handleBackClick = () => {
    navigation.navigate("SearchScreen");
  };
  const handleLearnMoreClick = () => {
    navigation.navigate("LearnMoreScreen", { foodProduct: foodProduct });
  };

  const handleLikeClick = async () => {
    const response = await API.post(ratingEndpoint, {
      userFoodProductRatingID: {
        userID: user.userID,
        foodProduct: foodProduct.result.code,
      },
      user: {
        userID: user.userID,
      },
      foodProduct: {
        foodProduct: foodProduct,
      },
    });
  };
  const handleSaveClick = () => {};

  //View
  return (
    <FoodProductDetailsScreen
      foodProduct={foodProduct}
      userSensitivities={formattedSensitivities}
      onBackClick={handleBackClick}
      onLearnMoreClick={handleLearnMoreClick}
    />
  );
};

export default FoodProductDetailsScreenPresenter;

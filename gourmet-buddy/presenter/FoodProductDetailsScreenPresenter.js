import { useContext } from "react";
import FoodProductDetailsScreen from "../view/screens/FoodProductDetailsScreen";
import { AuthenticationContext } from "../model/AuthenicationContext";
import useLoad from "../model/useLoad";
import API from "../model/API";
import { Alert } from "react-native";

const FoodProductDetailsScreenPresenter = ({ navigation, route }) => {
  //Initialisations
  const { user } = useContext(AuthenticationContext);
  const { foodProduct } = route.params;
  const userSensitivitiesEndpoint = `http://192.168.1.253:8090/api/relationships/cannoteat/${user.userID}`;
  const ratingEndpoint = "http://192.168.1.253:8090/api/rating/save";

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
      user: {
        userID: user.userID,
      },
      foodProduct: {
        code: foodProduct.result.code,
      },
      rating: "LIKED",
    });
    if (response.isSuccess) {
      console.log("Successful");
    } else {
      Alert.alert(
        "There have been issues rating this product, try again later."
      );
    }
  };
  const handleSaveClick = async () => {
    const response = await API.post(ratingEndpoint, {
      user: {
        userID: user.userID,
      },
      foodProduct: {
        code: foodProduct.result.code,
      },
      rating: "SAVED",
    });
    if (response.isSuccess) {
    } else {
      Alert.alert(
        "There have been issues rating this product, try again later."
      );
    }
  };

  //View
  return (
    <FoodProductDetailsScreen
      foodProduct={foodProduct}
      userSensitivities={formattedSensitivities}
      onBackClick={handleBackClick}
      onLearnMoreClick={handleLearnMoreClick}
      onLikeClick={handleLikeClick}
      onSaveClick={handleSaveClick}
    />
  );
};

export default FoodProductDetailsScreenPresenter;

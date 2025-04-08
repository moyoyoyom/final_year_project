import { useContext, useState } from "react";
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
  const saveRatingEndpoint = "http://192.168.1.253:8090/api/rating/save";
  const ratingEndpoint = `http://192.168.1.253:8090/api/rating/${user.userID}/${foodProduct.result.code}`;

  //State
  const [userSensitivities, isUserSensitivitiesLoading] = useLoad(
    userSensitivitiesEndpoint
  );
  const [rating, isRatingLoading, loadRating] = useLoad(ratingEndpoint);
  const [likeStatus, setLikeStatus] = useState(rating.rating);

  if (isUserSensitivitiesLoading || isRatingLoading) return;
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
    const response = await API.post(saveRatingEndpoint, {
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
      loadRating(ratingEndpoint);
      console.log(rating.rating);
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
      likeStatus={likeStatus}
    />
  );
};

export default FoodProductDetailsScreenPresenter;

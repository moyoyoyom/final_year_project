import { useContext, useEffect, useState } from "react";
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
  const likeProductEndpoint = `http://192.168.1.253:8090/api/rating/${user.userID}/${foodProduct.result.code}/liked`;

  //State
  const [userSensitivities, isUserSensitivitiesLoading] = useLoad(
    userSensitivitiesEndpoint
  );
  const [likeStatus, isLikeStatusLoading, loadLikeStatus] =
    useLoad(likeProductEndpoint);
  const [isProductLiked, setIsProductLiked] = useState("NONE");

  useEffect(() => {
    if (likeStatus && !isLikeStatusLoading) {
      setIsProductLiked(likeStatus.userFoodProductRatingID.rating);
    }
  });

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
    const rating = {
      user: {
        userID: user.userID,
      },
      foodProduct: {
        code: foodProduct.result.code,
      },
      rating: "LIKED",
    };

    if (isProductLiked === "LIKED") {
      setIsProductLiked("NONE");
      const response = await API.delete(likeProductEndpoint, rating);
      if (response.isSuccess) {
        loadLikeStatus(likeProductEndpoint);
      } else {
        Alert.alert("Issue removing your rating from this product.");
      }
    } else if (isProductLiked !== "LIKED") {
      const response = await API.post(`${saveRatingEndpoint}/liked`, rating);
      if (response.isSuccess) {
        loadLikeStatus(likeProductEndpoint);
      } else {
        Alert.alert(
          "There have been issues rating this product, try again later."
        );
      }
    }
  };

  const handleSaveClick = async () => {
    const response = await API.post(likeProductEndpoint, {
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
      likeStatus={isProductLiked}
    />
  );
};

export default FoodProductDetailsScreenPresenter;

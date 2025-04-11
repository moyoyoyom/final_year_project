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
  const likeProductEndpoint = `http://192.168.1.253:8090/api/rating/${user.userID}/${foodProduct.result.code}/LIKED`;
  const ratingEndpoint = `http://192.168.1.253:8090/api/rating/${user.userID}/${foodProduct.result.code}`;
  const saveHistoryEndpoint = `http://192.168.1.253:8090/api/history/save`;

  //State
  const [userSensitivities] = useLoad(userSensitivitiesEndpoint);
  const [likeStatus, isLikeStatusLoading, loadLikeStatus] = useLoad(
    `${ratingEndpoint}/LIKED`
  );
  const [saveStatus, isSaveStatusLoading, loadSaveStatus] = useLoad(
    `${ratingEndpoint}/SAVED`
  );
  const [isProductLiked, setIsProductLiked] = useState("NONE");
  const [isProductSaved, setIsProductSaved] = useState("NONE");

  useEffect(() => {
    if (likeStatus && !isLikeStatusLoading) {
      console.log("Like status: ", likeStatus.userFoodProductRatingID.rating);
      setIsProductLiked(likeStatus.userFoodProductRatingID.rating);
    }
  }, [likeStatus]);

  useEffect(() => {
    if (saveStatus && !isSaveStatusLoading) {
      console.log("Save status: ", saveStatus.userFoodProductRatingID.rating);
      setIsProductSaved(saveStatus.userFoodProductRatingID.rating);
    }
  }, [saveStatus]);

  useEffect(() => {
    const saveHistory = async () => {
      const viewedProductHistory = {
        user: {
          userID: user.userID,
        },
        foodProduct: {
          code: foodProduct.result.code,
        },
      };
      await API.post(saveHistoryEndpoint, viewedProductHistory);
    };
    saveHistory(), [];
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
      const response = await API.delete(likeProductEndpoint, rating);
      console.log(response);
      if (response.isSuccess) {
        loadLikeStatus(likeProductEndpoint);
        setIsProductLiked("NONE");
      } else {
        navigation.goBack();
        console.error(response);
      }
    } else if (isProductLiked !== "LIKED") {
      const response = await API.post(`${saveRatingEndpoint}/liked`, rating);
      if (response.isSuccess) {
        loadLikeStatus(likeProductEndpoint);
        setIsProductLiked("LIKED");
      } else {
        Alert.alert(
          "There have been issues rating this product, try again later."
        );
      }
    }
  };

  const handleSaveClick = async () => {
    const rating = {
      user: {
        userID: user.userID,
      },
      foodProduct: {
        code: foodProduct.result.code,
      },
      rating: "SAVED",
    };

    if (isProductSaved === "SAVED") {
      const response = await API.delete(`${ratingEndpoint}/SAVED`, rating);
      if (response.isSuccess) {
        loadSaveStatus(`${ratingEndpoint}/SAVED`);
        setIsProductSaved("NONE");
      } else {
        navigation.goBack();
        console.error(response);
      }
    } else if (isProductSaved !== "SAVED") {
      const response = await API.post(`${saveRatingEndpoint}/SAVED`, rating);
      if (response.isSuccess) {
        loadSaveStatus(`${ratingEndpoint}/SAVED`);
        setIsProductSaved("SAVED");
      } else {
        Alert.alert(
          "There have been issues rating this product, try again later."
        );
      }
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
      saveStatus={isProductSaved}
    />
  );
};

export default FoodProductDetailsScreenPresenter;

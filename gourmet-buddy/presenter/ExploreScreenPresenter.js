import { useContext, useEffect, useState } from "react";
import ExploreScreen from "../view/screens/ExploreScreen";
import { AuthenticationContext } from "../model/AuthenicationContext";
import API from "../model/API";
import { Alert } from "react-native";
import LoadingScreen from "../view/screens/LoadingScreen";
import Screen from "../view/UI/layout/Screen";

const ExploreScreenPresenter = ({ navigation }) => {
  //Initialisations
  const { user } = useContext(AuthenticationContext);
  const recommendationsEndpoint = `http://192.168.1.253:8090/api/foodproducts/recommendations/${user.userID}/50`;

  //State
  const [recommendations, setRecommendations] = useState(null);
  const [isRecommendationsLoading, setIsRecommendationsLoading] =
    useState(true);

  useEffect(() => {
    const getRecommedations = async () => {
      const response = await API.post(recommendationsEndpoint);
      if (response.isSuccess) {
        setRecommendations(response.result);
        setIsRecommendationsLoading(false);
      } else
        Alert.alert(
          "There has been a problem getting your recommendations: ",
          response.message
        );
    };
    getRecommedations();
  }, []);

  //Handlers
  const handleRecommendationClick = (foodProduct) => {
    console.log("Trying to navigate");
    navigation.navigate("FoodProductDetailsScreen", {
      foodProduct: foodProduct,
    });
    console.log("Navigating");
  };

  //View
  return (
    <Screen>
      {isRecommendationsLoading ? (
        <LoadingScreen />
      ) : (
        <ExploreScreen
          recommendations={recommendations}
          onSelect={handleRecommendationClick}
        />
      )}
    </Screen>
  );
};

export default ExploreScreenPresenter;

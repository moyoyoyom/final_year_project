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
  const recommendationsEndpoint = `http://gourmet-buddy-app.eu-west-2.elasticbeanstalk.com/api/foodproducts/recommendations/${user.userID}/50`;

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
    navigation.navigate("FoodProductDetailsScreen", {
      foodProduct: foodProduct,
    });
  };
  const handleMealsPress = () => {
    navigation.navigate("ExploreCategoryScreen", { theme: "Vegan" });
  };
  const handleHealthyFoodPress = () => {
    navigation.navigate("ExploreCategoryScreen", { theme: "Health" });
  };
  const handleGroceryPress = () => {
    navigation.navigate("ExploreCategoryScreen", { theme: "Grocery" });
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
          onMealsPress={handleMealsPress}
          onHealthyFoodPress={handleHealthyFoodPress}
          onGroceryPress={handleGroceryPress}
        />
      )}
    </Screen>
  );
};

export default ExploreScreenPresenter;

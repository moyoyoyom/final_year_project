import { useContext, useEffect, useState } from "react";
import ExploreCategoryScreen from "../view/screens/ExploreCategoryScreen";
import { AuthenticationContext } from "../model/AuthenicationContext";
import Screen from "../view/UI/layout/Screen";
import LoadingScreen from "../view/screens/LoadingScreen";
import { Alert } from "react-native";
import API from "../model/API";

const ExploreCategoryPresenter = ({ navigation, route }) => {
  //Initialisations
  const { user } = useContext(AuthenticationContext);
  const { theme } = route.params;
  const recommendationsEndpoint = `http://192.168.1.253:8090/api/foodproducts/recommendations/${user.userID}/50?theme=${theme}`;

  //State
  const [recommendations, setRecommendations] = useState(null);
  const [isRecommendationsLoading, setIsRecommendationsLoading] =
    useState(true);

  useEffect(() => {
    const getRecommedations = async () => {
      const response = await API.post(recommendationsEndpoint);
      if (response.isSuccess) {
        console.log("Successful");
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
  const handleReturnClick = () => navigation.goBack();

  //View
  return (
    <Screen>
      {isRecommendationsLoading ? (
        <LoadingScreen />
      ) : (
        <ExploreCategoryScreen
          recommendations={recommendations}
          onSelect={handleRecommendationClick}
          onReturnClick={handleReturnClick}
          theme={theme}
        />
      )}
    </Screen>
  );
};

export default ExploreCategoryPresenter;

import { useContext } from "react";
import LikedProductsScreen from "../view/screens/LikedProductsScreen";
import { AuthenticationContext } from "../model/AuthenicationContext";
import useLoad from "../model/useLoad";
import LoadingScreen from "../view/screens/LoadingScreen";
import { StyleSheet, View } from "react-native";

const LikedProductsPresenter = ({ navigation }) => {
  //Initialisations
  const { user } = useContext(AuthenticationContext);
  const likedFoodProductsEndpoint = `http://gourmet-buddy-app.eu-west-2.elasticbeanstalk.com/api/rating/${user.userID}/LIKED`;

  //State
  const [foodProducts, isFoodProductsLoading] = useLoad(
    likedFoodProductsEndpoint
  );

  //Handlers
  const handleReturnClick = () => navigation.goBack();
  const handleFoodProductSelect = (foodProduct) => {
    navigation.navigate("FoodProductDetailsScreen", {
      foodProduct: foodProduct,
    });
  };

  //View
  return (
    <View style={styles.viewStyle}>
      {isFoodProductsLoading ? (
        <LoadingScreen />
      ) : (
        <LikedProductsScreen
          foodProducts={foodProducts}
          onReturnClick={handleReturnClick}
          onSelect={handleFoodProductSelect}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    height: "100%",
  },
});

export default LikedProductsPresenter;

import { useContext } from "react";
import { AuthenticationContext } from "../model/AuthenicationContext";
import useLoad from "../model/useLoad";
import LoadingScreen from "../view/screens/LoadingScreen";
import { StyleSheet, View } from "react-native";
import SavedProductsScreen from "../view/screens/SavedProductsScreen";

const SavedProductsPresenter = ({ navigation }) => {
  //Initialisations
  const { user } = useContext(AuthenticationContext);
  const likedFoodProductsEndpoint = `http://192.168.1.253:8090/api/rating/${user.userID}/SAVED`;

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
        <SavedProductsScreen
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

export default SavedProductsPresenter;

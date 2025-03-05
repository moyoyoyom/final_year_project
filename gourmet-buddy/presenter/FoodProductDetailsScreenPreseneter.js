import { Text, View } from "react-native";
import FoodProductDetailsScreen from "../view/screens/FoodProductDetailsScreen";

const FoodProductDetailsScreenPresenter = (props) => {
  const { foodProduct } = props.route.params;

  if (!foodProduct || foodProduct == null) {
    return (
      <View>
        <Text> Product Data is Loading </Text>
      </View>
    );
  }

  return (
    <FoodProductDetailsScreen foodProductResult={foodProduct.product_name} />
  );
};

export default FoodProductDetailsScreenPresenter;

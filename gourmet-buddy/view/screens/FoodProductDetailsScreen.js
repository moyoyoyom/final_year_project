import { Text } from "react-native";
import Screen from "../UI/layout/Screen";

const FoodProductDetailsScreen = ({ foodProduct }) => {
  console.log(foodProduct);
  return (
    <Screen>
      <Text> Food Product results: </Text>
      <Text> {foodProduct.result.product_name} </Text>
    </Screen>
  );
};

export default FoodProductDetailsScreen;

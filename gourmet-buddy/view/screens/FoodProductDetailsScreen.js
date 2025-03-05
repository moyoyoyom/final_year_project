import { Text } from "react-native";
import Screen from "../UI/layout/Screen";

const FoodProductDetailsScreen = ({ foodProductResult }) => {
  return (
    <Screen>
      <Text> Food Product results: </Text>
      <Text> {foodProductResult}</Text>
    </Screen>
  );
};

export default FoodProductDetailsScreen;

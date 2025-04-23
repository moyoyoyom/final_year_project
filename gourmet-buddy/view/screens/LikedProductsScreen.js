import { StyleSheet, Text } from "react-native";
import NavigationBarPresenter from "../../presenter/NavigationBarPresenter";
import Header from "../UI/components/Header";
import Screen from "../UI/layout/Screen";
import Icons from "../UI/components/Icons";
import FoodProductList from "../entity/FoodProductList";

const LikedProductsScreen = ({ onReturnClick, foodProducts, onSelect }) => {
  console.log(foodProducts);
  return (
    <Screen>
      <Header
        leftItem={
          <Icons.ReturnIcon
            color={"#FFDC7A"}
            size={30}
            onPress={onReturnClick}
          />
        }
        centerItem={<Text style={styles.titleStyle}>Liked Products</Text>}
      />
      {foodProducts.length > 0 ? (
        <FoodProductList foodProducts={foodProducts} onSelect={onSelect} />
      ) : (
        <Text style={styles.placeholderTextStyle}>No recent history</Text>
      )}
      <NavigationBarPresenter />
    </Screen>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    marginRight: 120,
    textAlign: "center",
    color: "#faebc3",
    fontWeight: 600,
    fontSize: 20,
  },
});

export default LikedProductsScreen;

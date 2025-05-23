import Header from "../UI/components/Header";
import Screen from "../UI/layout/Screen";
import NavigationBarPresenter from "../../presenter/NavigationBarPresenter";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icons from "../UI/components/Icons";
import ResultsList from "../UI/components/ResultsList";

const ExploreScreen = ({
  recommendations,
  onSelect,
  onMealsPress,
  onHealthyFoodPress,
  onGroceryPress,
}) => {
  return (
    <Screen>
      <Header />
      <View style={styles.categoryPanes}>
        <TouchableOpacity
          style={styles.categoryItemStyle}
          onPress={onMealsPress}
        >
          <Icons.CuisineIcon size={50} />
          <Text>Vegan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryItemStyle}
          onPress={onHealthyFoodPress}
        >
          <Icons.HealthyIcon size={50} />
          <Text>Healthy Food</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryItemStyle}
          onPress={onGroceryPress}
        >
          <Icons.GroceryIcon size={50} />
          <Text>Groceries</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.recommendationPane}>
        <Text style={styles.subheadingStyle}>Check these out: </Text>
        <ResultsList results={recommendations} onSelect={onSelect} />
      </View>
      <NavigationBarPresenter />
    </Screen>
  );
};

const styles = StyleSheet.create({
  recommendationPane: {
    backgroundColor: "#faebc3",
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  categoryPanes: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 30,
    marginBottom: 15,
  },
  categoryItemStyle: {
    alignItems: "center",
  },
  subheadingStyle: {
    marginLeft: 30,
    marginTop: 28,
    fontWeight: 600,
    fontSize: 18,
  },
});

export default ExploreScreen;

import Header from "../UI/components/Header";
import Screen from "../UI/layout/Screen";
import NavigationBarPresenter from "../../presenter/NavigationBarPresenter";
import { StyleSheet, Text, View } from "react-native";
import Icons from "../UI/components/Icons";
import RecommendationsList from "../UI/components/RecommendationsList";

const ExploreScreen = ({ recommendations, onSelect }) => {
  return (
    <Screen>
      <Header />
      <View style={styles.categoryPanes}>
        <View style={styles.categoryItemStyle}>
          <Icons.CuisineIcon size={50} />
          <Text>Meals</Text>
        </View>
        <View style={styles.categoryItemStyle}>
          <Icons.HealthyIcon size={50} />
          <Text>Healthy Food</Text>
        </View>
        <View style={styles.categoryItemStyle}>
          <Icons.GroceryIcon size={50} />
          <Text>Groceries</Text>
        </View>
      </View>
      <View style={styles.recommendationPane}>
        <Text style={styles.subheadingStyle}>Check these out: </Text>
        <RecommendationsList
          recommendations={recommendations}
          onSelect={onSelect}
        />
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

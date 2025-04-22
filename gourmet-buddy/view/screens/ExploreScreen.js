import Header from "../UI/components/Header";
import Screen from "../UI/layout/Screen";
import NavigationBarPresenter from "../../presenter/NavigationBarPresenter";
import { ScrollView, StyleSheet } from "react-native";
import Icons from "../UI/components/Icons";

const ExploreScreen = () => {
  return (
    <Screen>
      <Header />
      <View>
        <Icons />
      </View>
      <ScrollView style={styles.recommendationPane}></ScrollView>
      <NavigationBarPresenter />
    </Screen>
  );
};

const styles = StyleSheet.create({
  recommendationPane: {
    backgroundColor: "lightgray",
    width: "100%",
  },
});

export default ExploreScreen;

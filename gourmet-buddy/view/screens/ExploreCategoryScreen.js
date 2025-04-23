import { StyleSheet, Text, View } from "react-native";
import Header from "../UI/components/Header";
import Screen from "../UI/layout/Screen";
import ResultsList from "../UI/components/ResultsList";
import NavigationBarPresenter from "../../presenter/NavigationBarPresenter";
import Icons from "../UI/components/Icons";

const ExploreCategoryScreen = ({
  recommendations,
  onSelect,
  onReturnClick,
  theme,
}) => {
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
        centerItem={<Text style={styles.titleStyle}>{theme} Products</Text>}
      />
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
  titleStyle: {
    marginRight: 120,
    textAlign: "center",
    color: "#faebc3",
    fontWeight: 600,
    fontSize: 20,
  },
});

export default ExploreCategoryScreen;

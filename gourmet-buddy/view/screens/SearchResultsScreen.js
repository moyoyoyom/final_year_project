import { StyleSheet, Text, View } from "react-native";
import Header from "../UI/components/Header";
import Icons from "../UI/components/Icons";
import Screen from "../UI/layout/Screen";
import NavigationBarPresenter from "../../presenter/NavigationBarPresenter";
import ResultsList from "../UI/components/ResultsList";

const SearchResultsScreen = ({
  onBackClick,
  searchTerm,
  results,
  onSelect,
}) => {
  return (
    <Screen>
      <Header
        leftItem={
          <Icons.ReturnIcon color={"#FFDC7A"} size={30} onPress={onBackClick} />
        }
        centerItem={<Text style={styles.titleStyle}>Search Results</Text>}
      />
      <Text>Results for the search: "{searchTerm}"</Text>
      <View style={styles.backgroundStyle}>
        {results.length === 0 ? (
          <Text style={styles.placeholderText}>
            No results could be found for that search term
          </Text>
        ) : (
          <ResultsList results={results} onSelect={onSelect} />
        )}
      </View>
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
  backgroundStyle: {
    backgroundColor: "#faebc3",
    width: "100%",
    height: "100%",
    marginTop: 20,
    borderRadius: 30,
  },
  placeholderText: {
    marginLeft: 50,
    marginTop: 30,
  },
});
export default SearchResultsScreen;

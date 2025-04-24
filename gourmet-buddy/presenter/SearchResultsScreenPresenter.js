import { StyleSheet, View } from "react-native";
import useLoad from "../model/useLoad";
import SearchResultsScreen from "../view/screens/SearchResultsScreen";
import LoadingScreen from "../view/screens/LoadingScreen";

const SearchResultsScreenPresenter = ({ route, navigation }) => {
  //Initialisations
  const { searchTerm } = route.params;
  const resultsEndpoint = `http://gourmet-buddy-app.eu-west-2.elasticbeanstalk.com/api/foodproducts/search?searchTerm=${searchTerm}`;

  //State
  const [results, isResultsLoading] = useLoad(resultsEndpoint);

  //Handlers
  const handleBackClick = () => navigation.goBack();
  const handleResultsSelect = (foodProduct) => {
    navigation.navigate("FoodProductDetailsScreen", {
      foodProduct: foodProduct,
    });
  };

  //View
  return (
    <View style={styles.viewStyle}>
      {isResultsLoading ? (
        <LoadingScreen />
      ) : (
        <SearchResultsScreen
          searchTerm={searchTerm}
          onBackClick={handleBackClick}
          results={results}
          onSelect={handleResultsSelect}
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

export default SearchResultsScreenPresenter;

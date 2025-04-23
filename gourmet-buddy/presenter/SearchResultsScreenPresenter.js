import useLoad from "../model/useLoad";
import SearchResultsScreen from "../view/screens/SearchResultsScreen";

const SearchResultsScreenPresenter = ({ route, navigation }) => {
  //Initialisations
  const { searchTerm } = route.params;
  const resultsEndpoint = ``;

  //State
  const [results, isResultsLoading] = useLoad(resultsEndpoint);

  //Handlers
  const handleBackClick = () => navigation.goBack();

  //View
  return (
    <View>
      {isResultsLoading ? (
        <LoadingScreen />
      ) : (
        <SearchResultsScreen
          searchTerm={searchTerm}
          onBackClick={handleBackClick}
          results={results}
        />
      )}
    </View>
  );
};

export default SearchResultsScreenPresenter;

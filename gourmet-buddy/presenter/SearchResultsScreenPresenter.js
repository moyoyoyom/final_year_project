import SearchResultsScreen from "../view/screens/SearchResultsScreen";

const SearchResultsScreenPresenter = ({ route, navigation }) => {
  //Initialisations
  const { searchTerm } = route.params;

  //Handlers
  const handleBackClick = () => navigation.goBack();

  //View
  return (
    <SearchResultsScreen
      searchTerm={searchTerm}
      onBackClick={handleBackClick}
    />
  );
};

export default SearchResultsScreenPresenter;

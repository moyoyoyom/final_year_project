import { useState } from "react";

import SearchScreen from "../view/screens/SearchScreen";
import API from "../model/API";
import resultLoader from "../model/ResultLoader";

const SearchFieldPresenter = ({ navigation }) => {
  //Initialisations
  const productSearchEndpoint = "http://";

  //State
  const [searchValue, setSearchValue] = useState(" ");
  const [searchResults, areResultsLoading, loadSearchResults] = resultLoader(
    productSearchEndpoint
  );

  //Handlers
  const handleSubmit = (newValue) => {
    setSearchValue(newValue);
    console.log(searchValue);
  };

  const postSearch = async (search) => {
    const result = await API.post(productSearchEndpoint, search);
    if (result.isSuccess) {
      loadSearchResults(productSearchEndpoint);
    } else {
      Alert.alert(result.message);
    }
  };

  const goToResultsScreen = () =>
    navigation.navigate("SearchResultsScreen", { postSearch });

  //View
  return (
    <SearchScreen
      onSearch={goToResultsScreen}
      //value={searchValue}
      onSubmit={handleSubmit}
      searchInputValue={searchValue}
    />
  );
};

export default SearchFieldPresenter;

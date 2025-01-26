import { useState } from "react";
import SearchScreen from "../view/screens/SearchScreen";

const SearchFieldPresenter = () => {
  //Initialisations
  //State
  const [searchValue, setSearchValue] = useState(" ");
  //Handlers
  const handleSubmit = (newValue) => {
    setSearchValue(newValue);
    console.log(searchValue);
  };

  //View
  return <SearchScreen value={searchValue} onSubmit={handleSubmit} />;
};

export default SearchFieldPresenter;

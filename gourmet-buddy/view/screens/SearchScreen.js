import { Header } from "react-native-elements";

import Screen from "../UI/Screen";
import SearchField from "../UI/components/SearchField";
import Icons from "../UI/components/Icons";

const SearchScreen = () => {
  //View
  return (
    <Screen>
      <Header
        leftComponent={<Icons.ReturnIcon />}
        centerComponent={<SearchField />}
        rightComponent={<Icons.MenuOptionsIcon />}
      />
    </Screen>
  );
};

export default SearchScreen;

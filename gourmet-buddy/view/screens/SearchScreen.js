import { Header } from "react-native-elements";

import Screen from "../UI/Screen";
import Icons from "../UI/components/Icons";

const SearchScreen = ({}) => {
  //View
  return (
    <Screen>
      <Header
        leftComponent={<Icons.ReturnIcon />}
        rightComponent={<Icons.MenuOptionsIcon />}
      />
    </Screen>
  );
};

export default SearchScreen;

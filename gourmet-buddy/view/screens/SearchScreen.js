import { Header } from "react-native-elements";

import Screen from "../UI/Screen";
import SearchField from "../UI/components/SearchField";
import Icons from "../UI/components/Icons";
import Button from "../UI/components/Button";

const SearchScreen = () => {
  //View
  return (
    <Screen>
      <Header
        leftComponent={<Icons.ReturnIcon />}
        centerComponent={<SearchField />}
        rightComponent={<Icons.MenuOptionsIcon />}
      />
      <Button
        buttonText="Scan Barcode or Label"
        buttonIcon={<Icons.CameraIcon />}
      />
    </Screen>
  );
};

export default SearchScreen;

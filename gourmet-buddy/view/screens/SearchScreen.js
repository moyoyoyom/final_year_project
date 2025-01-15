import { StyleSheet, Text, View } from "react-native";
import { Header } from "react-native-elements";

import Screen from "../UI/layout/Screen";
import SearchField from "../UI/components/SearchField";
import Icons from "../UI/components/Icons";
import Button from "../UI/components/Button";
import Divider from "../UI/components/Divider";
import FoodProductList from "../entity/FoodProductList";

const SearchScreen = () => {
  //DELETE THIS DUMMY DATA LATER
  const foodProducts = [];
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
      <Divider />
      <View style={styles.historyTitleRowStyle}>
        <Text> History </Text>
        <Button buttonText="Most recent" />
      </View>
      <FoodProductList foodProducts={foodProducts} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  historyTitleRowStyle: {
    flexDirection: "row",
    maxHeight: 20,
    marginBottom: 50,
  },
});
export default SearchScreen;

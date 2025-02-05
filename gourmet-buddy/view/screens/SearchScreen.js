import { StyleSheet, Text, View } from "react-native";

import Header from "../UI/components/Header";
import Screen from "../UI/layout/Screen";
import SearchField from "../UI/components/SearchField";
import Icons from "../UI/components/Icons";
import Button from "../UI/components/Button";
import Divider from "../UI/components/Divider";
import FoodProductList from "../entity/FoodProductList";

const SearchScreen = ({ onSearch, searchInputValue }) => {
  //DELETE THIS DUMMY DATA LATER
  const foodProducts = [
    {
      productID: 0,
      productName: "Vegetable Oil",
    },
    {
      productID: 1,
      productName: "Pizza",
    },
    {
      productID: 2,
      productName: "Ice cream",
    },
  ];

  //View
  return (
    <Screen>
      <Header
        leftItem={<Icons.ReturnIcon color={"#FFDC7A"} size={30} />}
        centerItem={
          <SearchField value={searchInputValue} onSubmit={onSearch} />
        }
        rightItem={<Icons.MenuOptionsIcon color={"#FFDC7A"} size={30} />}
      />
      <Button
        buttonStyle={styles.scanButtonStyle}
        labelStyle={styles.scanButtonLabelStyle}
        buttonText="Scan Barcode or Label"
        buttonIcon={<Icons.CameraIcon color={"#FFDC7A"} size={30} />}
      />
      <Divider customDividerStyle={styles.dividerSpacing} />
      <View style={styles.historyTitleRowStyle}>
        <Text style={styles.historyText}> History </Text>
        <Button
          buttonStyle={styles.mostRecentButtonStyle}
          labelStyle={styles.mostRecentButtonLabelStyle}
          buttonText="Most recent"
          buttonIcon={<Icons.SortAscending size={20} />}
        />
      </View>
      <FoodProductList foodProducts={foodProducts} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  historyTitleRowStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
    marginBottom: 15,
  },
  mostRecentButtonStyle: {
    paddingLeft: 15,
    paddingRight: 15,
    minHeight: 40,
    borderColor: "#0B3007",
  },
  mostRecentButtonLabelStyle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#0B3007",
  },
  scanButtonStyle: {
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#0B3007",
  },
  scanButtonLabelStyle: {
    color: "#FFDC7A",
    fontWeight: "bold",
  },
  historyText: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#0B3007",
  },
  dividerSpacing: {
    marginBottom: 15,
  },
});

export default SearchScreen;

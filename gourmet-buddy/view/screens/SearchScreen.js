import { StyleSheet, Text, View } from "react-native";

import Header from "../UI/components/Header";
import Screen from "../UI/layout/Screen";
import SearchField from "../UI/components/SearchField";
import Icons from "../UI/components/Icons";
import Button from "../UI/components/Button";
import Divider from "../UI/components/Divider";
import FoodProductList from "../entity/FoodProductList";
import NavigationBarPresenter from "../../presenter/NavigationBarPresenter";

const SearchScreen = ({
  onSearch,
  searchInputValue,
  onScanButtonClick,
  onReturnClick,
  foodProducts,
  onSelect,
  onReverseClick,
  reversed,
  setSearchFieldInputValue,
}) => {
  //View
  return (
    <Screen>
      <Header
        leftItem={
          <Icons.ReturnIcon
            color={"#FFDC7A"}
            size={30}
            onPress={onReturnClick}
          />
        }
        centerItem={
          <SearchField
            value={searchInputValue}
            onSubmit={onSearch}
            customSearchFieldStyle={styles.customSearchFieldStyle}
            onTextChange={setSearchFieldInputValue}
          />
        }
      />
      <Button
        onClick={onScanButtonClick}
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
          buttonText={reversed ? "Least recent" : "Most recent"}
          buttonIcon={
            reversed ? (
              <Icons.SortDescending size={20} />
            ) : (
              <Icons.SortAscending size={20} />
            )
          }
          onClick={onReverseClick}
        />
      </View>
      {foodProducts.length > 0 ? (
        <FoodProductList foodProducts={foodProducts} onSelect={onSelect} />
      ) : (
        <Text>No recent history</Text>
      )}
      <NavigationBarPresenter />
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
  customSearchFieldStyle: {
    minHeight: 35,
    marginRight: 30,
    width: 300,
  },
});

export default SearchScreen;

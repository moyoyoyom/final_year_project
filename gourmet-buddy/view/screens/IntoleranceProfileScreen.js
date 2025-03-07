import { StyleSheet, Text } from "react-native";
import Screen from "../UI/layout/Screen";
import SearchField from "../UI/components/SearchField";
import Button from "../UI/components/Button";
import TriggerList from "../entity/TriggerList";

const IntoleranceProfileScreen = ({
  foodTriggers,
  onTriggerSelect,
  onNextPageSelect,
  selectedItems,
  screenType,
}) => {
  //Initialisations
  const searchBarPlaceholder =
    "Search for more allergens, sensitivities or intolerances etc.";
  const screenTitle =
    screenType == "intoleranceProfile"
      ? "What can't you eat?"
      : "What don't you like?";
  const firstSubtitle =
    screenType == "intoleranceProfile"
      ? "Add anything you are allergic / intolerant towards."
      : "Add any food products that you can eat, but simply do not like.";
  const secondSubtitle =
    screenType == "intoleranceProfile"
      ? "We'll use this to find food products you can eat"
      : "We'll use this to find things you can and would like to eat.";
  const buttonText =
    screenType == "intoleranceProfile"
      ? "What food do you avoid?"
      : "All done!";

  //View
  return (
    <Screen screenStyle={styles.backgroundStyle}>
      <Text style={styles.screenTitle}> {screenTitle} </Text>
      <Text style={styles.descriptionText}>{firstSubtitle}</Text>
      <Text style={styles.descriptionText}>{secondSubtitle}</Text>
      <SearchField
        customSearchFieldStyle={styles.searchFieldStyle}
        placeholderText={searchBarPlaceholder}
      />
      <TriggerList
        triggerFoods={foodTriggers}
        onSelect={onTriggerSelect}
        selectedItems={selectedItems}
      />
      <Button
        buttonText={buttonText}
        buttonStyle={styles.buttonStyle}
        labelStyle={styles.buttonLabelStyle}
        onClick={onNextPageSelect}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screenTitle: {
    paddingTop: 30,
    paddingBottom: 15,
    fontSize: 30,
    fontWeight: 500,
    width: "50%",
    textAlign: "center",
    color: "#0B3007",
  },
  descriptionText: {
    textAlign: "center",
    width: "75%",
    fontSize: "16",
    fontWeight: 500,
    color: "#0B3007",
  },
  searchFieldStyle: {
    borderColor: "#0B3007",
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    width: "80%",
    minHeight: 45,
  },
  buttonStyle: {
    marginBottom: 30,
    marginTop: 15,
    backgroundColor: "#0B3007",
    borderColor: "#0B3007",
    width: "80%",
  },
  buttonLabelStyle: {
    fontWeight: 600,
    padding: 5,
    color: "#FFDC7A",
  },
  backgroundStyle: {
    backgroundColor: "#D5DBB8",
  },
});

export default IntoleranceProfileScreen;

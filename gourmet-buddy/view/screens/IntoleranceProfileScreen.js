import { ScrollView, StyleSheet, Text } from "react-native";
import Screen from "../UI/layout/Screen";
import SearchField from "../UI/components/SearchField";
import Button from "../UI/components/Button";

const IntoleranceProfileScreen = () => {
  //Initialisations
  const searchBarPlaceholder = "Search for more allergens";

  //View
  return (
    <Screen screenStyle={styles.backgroundStyle}>
      <Text style={styles.screenTitle}> What can't you eat? </Text>
      <Text style={styles.descriptionText}>
        {" "}
        Add anything you're allergic / intolerant towards.{" "}
      </Text>
      <Text style={styles.descriptionText}>
        {" "}
        We'll use this to find food products you can eat.{" "}
      </Text>
      <SearchField
        customSearchFieldStyle={styles.searchFieldStyle}
        placeholderText={searchBarPlaceholder}
      />
      <ScrollView></ScrollView>
      <Button
        buttonText={"What food do you avoid?"}
        buttonStyle={styles.buttonStyle}
        labelStyle={styles.buttonLabelStyle}
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
  },
  buttonStyle: {
    marginBottom: 30,
    backgroundColor: "#0B3007",
    borderColor: "#0B3007",
    width: "80%",
  },
  buttonLabelStyle: {
    fontWeight: 600,
    padding: 5,
  },
  backgroundStyle: {
    backgroundColor: "#D5DBB8",
  },
});

export default IntoleranceProfileScreen;

import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

const SearchField = () => {
  return <Searchbar placeholder="Search" style={styles.searchBarStyle} />;
};

const styles = StyleSheet.create({
  searchBarStyle: {
    width: "120%",
  },
});
export default SearchField;

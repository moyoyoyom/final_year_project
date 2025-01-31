import { StyleSheet, View, TextInput } from "react-native";

const SearchField = ({ value, onSubmit }) => {
  return (
    <View style={styles.backgroundStyle}>
      <TextInput
        value={value}
        onSubmitEditing={onSubmit}
        placeholder="Search for product"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    height: "auto",
    width: 270,
  },
});

export default SearchField;

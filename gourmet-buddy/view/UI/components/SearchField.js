import { StyleSheet, View, TextInput } from "react-native";
import Icons from "./Icons";

const SearchField = ({
  value,
  onSubmit,
  customSearchFieldStyle,
  placeholderText,
}) => {
  return (
    <View style={[styles.backgroundStyle, customSearchFieldStyle]}>
      <Icons.SearchIcon size={24} color={"#0B3007"} />
      <TextInput
        style={styles.inputStyle}
        value={value}
        onSubmitEditing={onSubmit}
        placeholder={placeholderText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30,
    height: "10%",
    width: 270,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputStyle: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 5,
  },
});

export default SearchField;

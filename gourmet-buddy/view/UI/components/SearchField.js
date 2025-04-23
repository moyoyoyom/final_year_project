import { StyleSheet, View, TextInput } from "react-native";
import Icons from "./Icons";

const SearchField = ({
  value,
  onTextChange,
  customSearchFieldStyle,
  placeholderText,
  onSubmit,
}) => {
  return (
    <View style={[styles.backgroundStyle, customSearchFieldStyle]}>
      <Icons.SearchIcon size={24} color={"#0B3007"} />
      <TextInput
        style={styles.inputStyle}
        value={value}
        onChangeText={(value) => onTextChange(value)}
        placeholder={placeholderText}
        onSubmitEditing={onSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "white",
    paddingLeft: 10,
    borderRadius: 30,
    minHeight: 30,
    maxHeight: 30,
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

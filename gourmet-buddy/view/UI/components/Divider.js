import { StyleSheet, View } from "react-native";

const Divider = () => {
  return <View style={styles.dividerStyle} />;
};

const styles = StyleSheet.create({
  dividerStyle: {
    height: 1,
    width: "90%",
    backgroundColor: "black",
    margin: 25,
    borderRadius: 5,
  },
});

export default Divider;

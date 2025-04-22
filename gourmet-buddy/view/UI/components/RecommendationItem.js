import { StyleSheet, View } from "react-native";

const RecommendationItem = ({ recommendation }) => {
  //View
  return <View style={styles.itemStyle}></View>;
};

const styles = StyleSheet.create({
  itemStyle: {
    backgroundColor: "white",
    width: 170,
    height: 240,
    borderRadius: 20,
    margin: 5,
  },
});
export default RecommendationItem;

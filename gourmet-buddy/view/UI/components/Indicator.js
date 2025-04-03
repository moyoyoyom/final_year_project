import { StyleSheet, View } from "react-native";

const Indicator = ({ status }) => {
  return (
    <View
      style={[
        styles.defaultIndicator,
        status === "Neutral" && styles.amberIndicator,
        status === "Unhealthy" && styles.redIndicator,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  defaultIndicator: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    backgroundColor: "#43C831",
    marginRight: 10,
  },
  redIndicator: {
    backgroundColor: "#D95347",
  },
  amberIndicator: {
    backgroundColor: "#EEA022",
  },
});
export default Indicator;

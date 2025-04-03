import { ScrollView, StyleSheet, Text, View } from "react-native";
import Divider from "../components/Divider";
import Indicator from "./Indicator";

const List = ({ items }) => {
  return (
    <ScrollView style={styles.container}>
      {items.map((item, index) => {
        return (
          <View key={index}>
            <View style={styles.lineStyle}>
              <Text style={styles.boldText}>{item.nutriment} </Text>
              <View style={styles.amountSectionStyle}>
                <Indicator status={item.classification} />
                {item.nutriment === "Calories" ? (
                  <Text>{item.amount} kcal per 100g</Text>
                ) : (
                  <Text>{item.amount}g per 100g</Text>
                )}
              </View>
            </View>
            <Divider customDividerStyle={[styles.dividerStyle]} />
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dividerStyle: {
    margin: 0,
    alignSelf: "center",
  },
  container: {
    width: "100%",
  },
  boldText: {
    fontWeight: 600,
    marginLeft: 50,
  },
  indicatorStyle: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    backgroundColor: "#43C831",
    marginRight: 10,
  },
  amountSectionStyle: {
    flexDirection: "row",
    alignSelf: "flex-end",
    width: "40%",
  },
  lineStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  redIndicatorStyle: {
    backgroundColor: "#D95347",
  },
  amberIndicatorStyle: {
    backgroundColor: "#EEA022",
  },
});

export default List;

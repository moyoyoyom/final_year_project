import { ScrollView, StyleSheet, Text, View } from "react-native";
import Divider from "../components/Divider";

const List = ({ items }) => {
  return (
    <ScrollView style={styles.container}>
      {items.map((item, index) => {
        return (
          <View key={index}>
            <Text style={styles.boldText}>{item.nutriment} </Text>
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
  },
  container: {
    width: "100%",
  },
  boldText: {
    fontWeight: 600,
  },
});

export default List;

import { ScrollView, StyleSheet } from "react-native";
import TriggerItem from "./TriggerItem";

const TriggerList = ({ triggerFoods, onSelect, selectedItems }) => {
  //View
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {triggerFoods.map((triggerFood) => {
        return (
          <TriggerItem
            key={triggerFood.foodTriggerID}
            triggerFood={triggerFood}
            onSelect={onSelect}
            isSelected={selectedItems.includes(triggerFood)}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default TriggerList;

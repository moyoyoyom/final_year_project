import { Pressable, StyleSheet, Text } from "react-native";
import Icons from "../UI/components/Icons";

const TriggerItem = ({ triggerFood, onSelect }) => {
  //View
  return (
    <Pressable
      onPress={() => onSelect(triggerFood)}
      style={styles.pressableStyle}
    >
      <Text>{triggerFood.triggerName}</Text>
      <Icons.AddIcon />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressableStyle: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    marginRight: 5,
    marginBottom: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TriggerItem;

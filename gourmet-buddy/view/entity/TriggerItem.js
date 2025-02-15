import { Pressable, StyleSheet, Text } from "react-native";
import Icons from "../UI/components/Icons";

const TriggerItem = ({ triggerFood, onSelect, isSelected }) => {
  //View
  return (
    <Pressable
      onPress={() => onSelect(triggerFood)}
      style={isSelected ? styles.selectedPressableStyle : styles.pressableStyle}
    >
      <Text
        style={isSelected ? styles.selectedTriggerText : styles.triggerText}
      >
        {triggerFood.triggerName}
      </Text>
      <Icons.AddIcon size={20} color={isSelected ? "#FFDC7A" : "#0B3007"} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressableStyle: {
    borderColor: "#0B3007",
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    paddingRight: 10,
    paddingLeft: 8,
    marginRight: 5,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFDC7A",
  },
  triggerText: {
    fontSize: 15,
    fontWeight: 600,
    color: "#0B3007",
  },
  selectedPressableStyle: {
    borderColor: "#FFDC7A",
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    paddingRight: 10,
    paddingLeft: 8,
    marginRight: 5,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0B3007",
  },
  selectedTriggerText: {
    fontSize: 15,
    fontWeight: 600,
    color: "#FFDC7A",
  },
});

export default TriggerItem;

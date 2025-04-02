import { ScrollView, Text } from "react-native";

const List = ({ items }) => {
  return (
    <ScrollView>
      {items.map((item, index) => {
        return <Text key={index}>{item.nutriment}</Text>;
      })}
    </ScrollView>
  );
};

export default List;

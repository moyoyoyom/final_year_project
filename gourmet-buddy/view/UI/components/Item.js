import { Text, View } from "react-native";

const Item = ({ item }) => {
  return (
    <View>
      <Text>{item.nutriment}</Text>
      <Text>{item.amount}</Text>
    </View>
  );
};

export default Item;

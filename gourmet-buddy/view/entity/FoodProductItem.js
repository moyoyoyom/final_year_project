import { Pressable, Text, View } from "react-native";

const FoodProductItem = ({ foodProduct, onSelect }) => {
  return (
    <Pressable onPress={() => onSelect(foodProduct)}>
      <View>
        <Text>
          {foodProduct.productID} {foodProduct.productName}
        </Text>
      </View>
    </Pressable>
  );
};

export default FoodProductItem;

import { Pressable, StyleSheet, Text, View } from "react-native";

const FoodProductItem = ({ foodProduct, onSelect }) => {
  return (
    <Pressable
      onPress={() => onSelect(foodProduct)}
      style={styles.pressableItemStyle}
    >
      <View>
        <Text>
          {foodProduct.productID} {foodProduct.productName}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressableItemStyle: {
    backgroundColor: "grey",
    margin: 5,
    flex: 1,
    flexDirection: "row",
    width: "90%",
    height: 70,
    borderRadius: 20,
  },
});

export default FoodProductItem;

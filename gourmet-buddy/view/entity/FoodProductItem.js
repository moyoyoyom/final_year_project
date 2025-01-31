import { Pressable, StyleSheet, Text, View } from "react-native";
import Icons from "../UI/components/Icons";

const FoodProductItem = ({ foodProduct, onSelect }) => {
  return (
    <Pressable
      onPress={() => onSelect(foodProduct)}
      style={styles.pressableItemStyle}
    >
      <View style={styles.productImageStyle}>
        <Icons.DefaultImage size={30} color={"#0B3007"} />
      </View>
      <View>
        <Text style={styles.productInfo}>
          {foodProduct.productID} {foodProduct.productName}
        </Text>
      </View>
      <Icons.ForwardIcon size={30} color={"#0B3007"} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressableItemStyle: {
    backgroundColor: "#D5DBB8",
    margin: 5,
    flex: 1,
    flexDirection: "row",
    height: 70,
    borderRadius: 20,
    justifyContent: "space-between",
    width: "95%",
    alignItems: "center",
  },
  productInfo: {
    color: "#0B3007",
  },
  productImageStyle: {
    marginLeft: 20,
  },
});

export default FoodProductItem;

import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Icons from "../UI/components/Icons";

const FoodProductItem = ({ foodProduct, onSelect }) => {
  //Initialisations
  const imageURL =
    foodProduct.image_url === null || foodProduct.image_url.trim().length === 0
      ? "https://hadramut.com/_nuxt/img/placeholder.d41418b.jpg"
      : foodProduct.image_url;

  //View
  return (
    <Pressable
      onPress={() => onSelect(foodProduct)}
      style={styles.pressableItemStyle}
    >
      <View style={styles.productImageStyle}>
        <Image source={{ uri: imageURL }} style={styles.imageStyle} />
      </View>
      <View style={styles.textContainerStyle}>
        <Text style={styles.productInfo}>
          {foodProduct.brands} - {foodProduct.product_name}
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
    height: 90,
    borderRadius: 20,
    justifyContent: "space-between",
    width: "95%",
    alignItems: "center",
  },
  productInfo: {
    color: "#0B3007",
  },
  productImageStyle: {
    marginLeft: 10,
  },
  imageStyle: {
    minHeight: 70,
    minWidth: 70,
    borderRadius: 10,
  },
  textContainerStyle: {
    width: "50%",
  },
});

export default FoodProductItem;

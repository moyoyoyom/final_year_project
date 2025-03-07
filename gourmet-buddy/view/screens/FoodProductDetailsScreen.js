import { Image, StyleSheet, Text, View } from "react-native";
import Screen from "../UI/layout/Screen";
import Header from "../UI/components/Header";

const FoodProductDetailsScreen = ({ foodProduct }) => {
  return (
    <Screen>
      <Header />
      <View style={styles.titleRowLayout}>
        <Image
          source={{ uri: foodProduct.result.image_url }}
          style={styles.imageStyling}
        />
        <Text> {foodProduct.result.product_name} </Text>
      </View>
      <Text> Ingredients:</Text>
      <Text> {foodProduct.result.ingredients_text}</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  imageStyling: {
    minHeight: 150,
    minWidth: 150,
    borderRadius: 20,
  },
  titleRowLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default FoodProductDetailsScreen;

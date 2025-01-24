import { ScrollView, StyleSheet } from "react-native";

import FoodProductItem from "./FoodProductItem";

const FoodProductList = ({ foodProducts, onSelect }) => {
  return (
    <ScrollView style={styles.listStyle}>
      {foodProducts.map((foodProduct) => {
        return (
          <FoodProductItem
            key={foodProduct.productID}
            foodProduct={foodProduct}
            onSelect={onSelect}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    width: "90%",
    paddingLeft: 20,
  },
});

export default FoodProductList;

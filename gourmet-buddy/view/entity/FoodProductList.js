import { ScrollView, StyleSheet } from "react-native";

import FoodProductItem from "./FoodProductItem";

const FoodProductList = ({ foodProducts, onSelect }) => {
  return (
    <ScrollView style={styles.listStyle}>
      {foodProducts.map((foodProduct) => {
        return (
          <FoodProductItem
            key={foodProduct.code}
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
    width: "95%",
    paddingLeft: 5,
    marginBottom: 100,
  },
});

export default FoodProductList;

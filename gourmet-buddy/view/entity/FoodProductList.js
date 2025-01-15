import { ScrollView } from "react-native";

import FoodProductItem from "./FoodProductItem";

const FoodProductList = ({ foodProducts, onSelect }) => {
  return (
    <ScrollView>
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

export default FoodProductList;

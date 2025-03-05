import FoodProductDetailsScreen from "../view/screens/FoodProductDetailsScreen";

const FoodProductDetailsScreenPresenter = (props) => {
  const { foodProduct } = props.route.params;
  return (
    <FoodProductDetailsScreen foodProductResult={foodProduct.product_name} />
  );
};

export default FoodProductDetailsScreenPresenter;

import FoodProductDetailsScreen from "../view/screens/FoodProductDetailsScreen";

const FoodProductDetailsScreenPresenter = (props) => {
  const { foodProduct } = props.route.params;
  return <FoodProductDetailsScreen foodProduct={foodProduct} />;
};

export default FoodProductDetailsScreenPresenter;

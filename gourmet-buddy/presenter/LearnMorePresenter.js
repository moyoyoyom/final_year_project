import LearnMoreScreen from "../view/screens/LearnMoreScreen";

const LearnMorePresenter = ({ route }) => {
  //Initialisations
  const { foodProduct } = route.params;
  console.log(foodProduct);

  //View
  return <LearnMoreScreen foodProduct={foodProduct} />;
};

export default LearnMorePresenter;

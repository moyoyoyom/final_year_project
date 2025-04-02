import classifyNutriments from "../model/classifyNutriments";
import formatNutriments from "../model/formatNutriments";
import LearnMoreScreen from "../view/screens/LearnMoreScreen";

const LearnMorePresenter = ({ route }) => {
  //Initialisations
  const { foodProduct } = route.params;
  if (!foodProduct) return;
  console.log(foodProduct);
  const nutriments = formatNutriments(foodProduct);
  const classifiedNutriments = classifyNutriments(nutriments);

  console.log(classifiedNutriments);
  //View
  return <LearnMoreScreen foodProduct={foodProduct} />;
};

export default LearnMorePresenter;

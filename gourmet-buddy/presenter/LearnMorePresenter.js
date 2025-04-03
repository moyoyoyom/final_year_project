import {
  categoriseNutrimentsList,
  classifyNutriments,
} from "../model/classifyNutriments";
import formatNutriments from "../model/formatNutriments";
import LearnMoreScreen from "../view/screens/LearnMoreScreen";

const LearnMorePresenter = ({ route }) => {
  //Initialisations
  const { foodProduct } = route.params;
  if (!foodProduct) return;
  console.log(foodProduct);
  const nutriments = formatNutriments(foodProduct);
  const classifiedNutriments = classifyNutriments(nutriments);

  const { pros, cons } = categoriseNutrimentsList(classifiedNutriments);

  //View
  return <LearnMoreScreen foodProduct={foodProduct} pros={pros} cons={cons} />;
};

export default LearnMorePresenter;

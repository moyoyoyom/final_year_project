import {
  categoriseNutrimentsList,
  classifyNutriments,
} from "../model/classifyNutriments";
import formatNutriments from "../model/formatNutriments";
import LearnMoreScreen from "../view/screens/LearnMoreScreen";

const LearnMorePresenter = ({ route, navigation }) => {
  //Initialisations
  const { foodProduct } = route.params;
  if (!foodProduct) return;
  console.log(foodProduct);
  const nutriments = formatNutriments(foodProduct);
  const classifiedNutriments = classifyNutriments(nutriments);

  const { pros, cons } = categoriseNutrimentsList(classifiedNutriments);

  //Handlers
  const handleBackClick = () => navigation.goBack();

  //View
  return (
    <LearnMoreScreen
      foodProduct={foodProduct}
      pros={pros}
      cons={cons}
      onBackClick={handleBackClick}
    />
  );
};

export default LearnMorePresenter;

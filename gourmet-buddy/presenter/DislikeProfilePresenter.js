import { useContext, useEffect, useState } from "react";
import IntoleranceProfileScreen from "../view/screens/IntoleranceProfileScreen";
import { Alert } from "react-native";
import useLoad from "../model/useLoad";
import { AuthenticationContext } from "../model/AuthenicationContext";

const DislikeProfilePresenter = ({ navigation }) => {
  //Initialisations
  const { user } = useContext(AuthenticationContext);
  const foodTriggerEndpoint =
    "http://gourmet-buddy-app.eu-west-2.elasticbeanstalk.com/api/foodtriggers/getallbygroups";
  const userRelationshipsEndpoint =
    "http://gourmet-buddy-app.eu-west-2.elasticbeanstalk.com/api/relationships/save";
  const screenType = "dislikeProfile";

  //State
  const [foodTriggers, isFoodTriggersLoading] = useLoad(foodTriggerEndpoint);
  const [userFoodTriggers, setUserFoodTriggers] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredFoodTriggers, setFilteredFoodTriggers] = useState([]);

  useEffect(() => {
    setFilteredFoodTriggers(foodTriggers);
  }, [isFoodTriggersLoading]);

  //Handlers
  const onTriggerSelect = (selectedTrigger) => {
    setUserFoodTriggers([...userFoodTriggers, selectedTrigger]);
    if (!selectedItems.includes(selectedTrigger)) {
      setSelectedItems([...selectedItems, selectedTrigger]);
    } else {
      setSelectedItems(
        selectedItems.filter((trigger) => trigger !== selectedTrigger)
      );
    }
  };

  const onNextPageSelect = () => {
    postEachUserRelationship();
    navigation.replace("AppStack");
  };

  const postEachUserRelationship = async () => {
    userFoodTriggers.forEach(async (foodTrigger) => {
      try {
        await fetch(userRelationshipsEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userIngredientRelationshipID: {
              userID: user.userID,
              foodTriggerID: foodTrigger.foodTriggerID,
            },
            relationship: "DISLIKES",
            user: {
              userID: user.userID,
            },
            foodTrigger: {
              foodTriggerID: foodTrigger.foodTriggerID,
              triggerName: foodTrigger.triggerName,
              foodGroupID: foodTrigger.foodGroupID,
            },
          }),
        });
      } catch (error) {
        Alert.alert("There have been issues saving your intolerances");
      }
    });
  };

  const handleSearchBarInput = (input) => {
    const filteredTriggers = foodTriggers.filter((trigger) =>
      trigger.triggerName.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredFoodTriggers(filteredTriggers);
  };

  //View
  return (
    <IntoleranceProfileScreen
      foodTriggers={filteredFoodTriggers}
      onTriggerSelect={onTriggerSelect}
      onNextPageSelect={onNextPageSelect}
      selectedItems={selectedItems}
      screenType={screenType}
      onSearchBarInput={handleSearchBarInput}
    />
  );
};

export default DislikeProfilePresenter;

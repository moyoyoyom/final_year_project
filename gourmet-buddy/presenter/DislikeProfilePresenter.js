import { useEffect, useState } from "react";
import IntoleranceProfileScreen from "../view/screens/IntoleranceProfileScreen";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import useLoad from "../model/useLoad";

const DislikeProfilePresenter = ({ navigation }) => {
  //Initialisations
  const foodTriggerEndpoint =
    "http://gourmet-buddy-app.eu-west-2.elasticbeanstalk.com/api/foodtriggers/getallbygroups";
  const userRelationshipsEndpoint =
    "http://gourmet-buddy-app.eu-west-2.elasticbeanstalk.com/api/relationships/save";
  const getFoodTriggersOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const screenType = "dislikeProfile";

  useEffect(() => {
    const findUserToken = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        setUserToken(token);
      } catch (error) {
        Alert.error(error);
      }
    };
    findUserToken();
  }, []);

  //State
  const [foodTriggers, isFoodTriggersLoading] = useLoad(foodTriggerEndpoint);
  const [userFoodTriggers, setUserFoodTriggers] = useState([]);
  const [userToken, setUserToken] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredFoodTriggers, setFilteredFoodTriggers] = useState([
    foodTriggers,
  ]);

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
    const decodedUser = jwtDecode(userToken);
    userFoodTriggers.forEach(async (foodTrigger) => {
      try {
        await fetch(userRelationshipsEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userIngredientRelationshipID: {
              userID: decodedUser.userID,
              foodTriggerID: foodTrigger.foodTriggerID,
            },
            relationship: "DISLIKES",
            user: {
              userID: decodedUser.userID,
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

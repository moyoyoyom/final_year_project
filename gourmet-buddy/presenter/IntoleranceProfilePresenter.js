import { useEffect, useState } from "react";
import IntoleranceProfileScreen from "../view/screens/IntoleranceProfileScreen";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const IntoleranceProfilePresenter = ({ navigation }) => {
  //Initialisations
  const foodTriggerEndpoint =
    "http://192.168.1.253:8090/api/foodtriggers/getallbygroups";
  const userRelationshipsEndpoint =
    "http://192.168.1.253:8090/api/relationships/save";
  const getFoodTriggersOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  useEffect(() => {
    getFoodTriggersFromEndpoint();
  }, []);

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
  const [foodTriggers, setFoodTriggers] = useState([]);
  const [userFoodTriggers, setUserFoodTriggers] = useState([]);
  const [userToken, setUserToken] = useState(null);

  //Handlers
  const getFoodTriggersFromEndpoint = async () => {
    try {
      const response = await fetch(foodTriggerEndpoint, getFoodTriggersOptions);
      if (response.ok) {
        const result = await response.json();
        setFoodTriggers(result);
      }
    } catch (error) {
      Alert.alert(error);
    }
  };

  const onTriggerSelect = (selectedTrigger) => {
    setUserFoodTriggers([...userFoodTriggers, selectedTrigger]);
  };

  const onNextPageSelect = () => {
    postEachUserRelationshipOptions();
    navigation.navigate("DislikeProfileScreen");
  };

  //post user food triggers to create user ingredients relationship entity
  const saveUserFoodTriggers = async () => {
    try {
      const response = await fetch(
        userRelationshipsEndpoint,
        postUserRelationshipOptions
      );
      if (response.ok) {
        Alert.alert("Your intolerances have been saved");
      }
    } catch (error) {
      Alert.alert("There have been problems saving your intolerances");
    }
  };

  const postEachUserRelationshipOptions = async () => {
    const decodedUser = jwtDecode(userToken);
    foodTriggers.forEach(async (foodTrigger) => {
      try {
        await fetch(userRelationshipsEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: decodedUser, foodTrigger: foodTrigger }),
        });
      } catch (error) {
        Alert.alert("There have been issues saving your intolerances");
      }
    });
  };

  //View
  return (
    <IntoleranceProfileScreen
      foodTriggers={foodTriggers}
      onTriggerSelect={onTriggerSelect}
      onNextPageSelect={onNextPageSelect}
    />
  );
};

export default IntoleranceProfilePresenter;

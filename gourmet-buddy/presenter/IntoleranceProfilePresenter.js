import { useEffect, useState } from "react";
import IntoleranceProfileScreen from "../view/screens/IntoleranceProfileScreen";

const IntoleranceProfilePresenter = () => {
  //Initialisations
  const foodTriggerEndpoint =
    "http://192.168.1.253:8090/api/foodtriggers/getallbygroups";
  const getFoodTriggersOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  useEffect(() => {
    getFoodTriggersFromEndpoint();
  }, []);

  //State
  const [foodTriggers, setFoodTriggers] = useState([]);

  //Handlers
  const getFoodTriggersFromEndpoint = async () => {
    try {
      const response = await fetch(foodTriggerEndpoint, getFoodTriggersOptions);
      if (response.ok) {
        const result = await response.json();
        setFoodTriggers(result);
        console.log(foodTriggers);
      }
    } catch (error) {
      Alert.alert(error);
    }
  };

  //View
  return <IntoleranceProfileScreen foodTriggers={foodTriggers} />;
};

export default IntoleranceProfilePresenter;

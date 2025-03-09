import { useEffect, useState } from "react";
import FoodProductDetailsScreen from "../view/screens/FoodProductDetailsScreen";
import { jwtDecode } from "jwt-decode";
import useLoad from "../model/useLoad";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import LoadingScreen from "../view/screens/LoadingScreen";

const FoodProductDetailsScreenPresenter = (props) => {
  //Initialisations
  const { foodProduct } = props.route.params;

  const userSensitivitiesEndpoint = `http://192.168.1.253:8090/api/relationships/cannoteat/${userID}`;

  //State
  const [userToken, setUserToken] = useState(null);
  const [userSensitivities] = useLoad(userSensitivitiesEndpoint);
  const [userID, setUserID] = useState(null);
  const [userIntolerances, setUserIntolerances] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("userToken")
      .then((token) => {
        setUserToken(token);
      })
      .catch((error) => Alert.alert("Error finding your intolerances ", error));
  }, []);

  useEffect(() => {
    if (userToken !== null) {
      const decodedUser = jwtDecode(userToken);
      setUserID(decodedUser.userID);
    }
  }, []);

  useEffect(() => {
    if (userSensitivities) {
      const intolerances = userSensitivities.map(
        (trigger) => trigger.triggerName
      );
      setUserIntolerances(intolerances);
    }
  }, []);

  //View
  return userIntolerances !== null ? (
    <FoodProductDetailsScreen
      foodProduct={foodProduct}
      userSensitivities={userIntolerances}
    />
  ) : (
    <LoadingScreen />
  );
};

export default FoodProductDetailsScreenPresenter;

import { useEffect, useState } from "react";
import FoodProductDetailsScreen from "../view/screens/FoodProductDetailsScreen";
import { jwtDecode } from "jwt-decode";
import useLoad from "../model/useLoad";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import LoadingScreen from "../view/screens/LoadingScreen";
import API from "../model/API";

const FoodProductDetailsScreenPresenter = ({ navigation, route }) => {
  //Initialisations
  const { foodProduct } = route.params;

  //State
  const [userToken, setUserToken] = useState(null);
  const [userID, setUserID] = useState(null);
  const [rawSensitivities, setRawSensitivities] = useState(null);
  const [userIntolerances, setUserIntolerances] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("userToken")
      .then((token) => {
        setUserToken(token);
      })
      .catch((error) => Alert.alert("Error finding your intolerances ", error));
  }, []);

  useEffect(() => {
    if (!userToken) return;
    try {
      const decodedUser = jwtDecode(userToken);
      setUserID(decodedUser.userID);
    } catch (error) {
      Alert.alert("Errors verifying your ID", error);
    }
  }, [userToken]);

  useEffect(() => {
    if (!userID) return;
    const getRawSensitivities = async () => {
      const userSensitivitiesEndpoint = `http://192.168.1.253:8090/api/relationships/cannoteat/${userID}`;
      const userSensitivities = await API.get(userSensitivitiesEndpoint);
      setRawSensitivities(userSensitivities);
    };
    getRawSensitivities();
  }, [userID]);

  useEffect(() => {
    if (!rawSensitivities) return;
    const processSensitvities = async () => {
      const intolerances = await rawSensitivities.result.map(
        (trigger) => trigger.triggerName
      );
      setUserIntolerances(intolerances);
    };
    processSensitvities();
  }, [rawSensitivities]);

  //Handlers
  const handleBackClick = () => {
    navigation.navigate("SearchScreen");
  };

  //View
  if (userIntolerances === null) {
    return <LoadingScreen />;
  }

  return (
    <FoodProductDetailsScreen
      foodProduct={foodProduct}
      userSensitivities={userIntolerances}
      onBackClick={handleBackClick}
    />
  );
};

export default FoodProductDetailsScreenPresenter;

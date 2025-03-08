import { useState } from "react";
import FoodProductDetailsScreen from "../view/screens/FoodProductDetailsScreen";
import { jwtDecode } from "jwt-decode";

const FoodProductDetailsScreenPresenter = (props) => {
  //Initialisations
  const { foodProduct } = props.route.params;

  const decodedUser = jwtDecode(userToken);

  //State
  const [userSensitivities, setUserSensitivities] = useState([]);

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
  const [userToken, setUserToken] = useState(null);

  //View
  return (
    <FoodProductDetailsScreen
      foodProduct={foodProduct}
      userSensitivities={userSensitivities}
    />
  );
};

export default FoodProductDetailsScreenPresenter;

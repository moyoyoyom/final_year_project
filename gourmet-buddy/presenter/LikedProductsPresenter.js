import { useContext } from "react";
import LikedProductsScreen from "../view/screens/LikedProductsScreen";
import { AuthenticationContext } from "../model/AuthenicationContext";

const LikedProductsPresenter = () => {
  //Initialisations
  const {user} = useContext(AuthenticationContext);
  const likedFoodProductsEndpoint = ``
  //View
  return <LikedProductsScreen foodProducts={}/>;
};

export default LikedProductsPresenter;

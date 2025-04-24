import { useContext, useEffect, useState } from "react";
import SearchScreen from "../view/screens/SearchScreen";
import API from "../model/API";
import CameraScreen from "../view/screens/CameraScreen";
import Screen from "../view/UI/layout/Screen";
import { Camera, useCameraPermissions } from "expo-camera";
import { Alert } from "react-native";
import useLoad from "../model/useLoad";
import { AuthenticationContext } from "../model/AuthenicationContext";

const SearchScreenPresenter = ({ navigation }) => {
  //Initalisations
  const { user, isUserLoading } = useContext(AuthenticationContext);
  if (isUserLoading || user === null) return;
  console.log("User details: ", user);
  const historyEndpoint = `http://gourmet-buddy-app.eu-west-2.elasticbeanstalk.com/api/history/recent/${user.userID}`;

  //State
  const [searchValue, setSearchValue] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [hasPermissionBeenGranted, setHasPermissionBeenGranted] =
    useCameraPermissions();
  const [userHistory, isUserHistoryLoading] = useLoad(historyEndpoint);

  const [historicFoodProducts, setHistoricFoodProducts] = useState([]);
  const [hasListBeenReversed, setHasListBeenReversed] = useState(false);

  useEffect(() => {
    if (isUserHistoryLoading) return;
    const viewedFoodProducts = userHistory.map(
      (foodProduct) => foodProduct.foodProduct
    );

    setHistoricFoodProducts(viewedFoodProducts);
  }, [userHistory, isUserHistoryLoading]);

  //Handlers
  const onBarcodeScanned = async ({ data }) => {
    if (scanned) return;
    setScanned(true);
    const response = await API.get(
      `http://gourmet-buddy-app.eu-west-2.elasticbeanstalk.com/api/foodproducts/barcode/${data}`
    );
    if (response.isSuccess) {
      navigation.navigate("FoodProductDetailsScreen", {
        foodProduct: response.result,
      });
    }
    setIsScanning(false);
    setTimeout(() => setScanned(false), 10000);
  };

  const onScanButtonClick = async () => {
    if (hasPermissionBeenGranted === null) {
      const { status } = await Camera.getCameraPermissionsAsync();
      setHasPermissionBeenGranted(status === "granted");
      if (status !== "granted") {
        Alert.alert("Camera permission is required");
        return;
      }
    }
    setIsScanning(true);
  };

  const onExitClick = () => {
    setIsScanning(false);
    navigation.navigate("SearchScreen");
  };

  const handleReturnClick = () => {
    navigation.goBack();
  };

  const handleFoodProductSelect = (foodProduct) => {
    navigation.navigate("FoodProductDetailsScreen", {
      foodProduct: foodProduct,
    });
  };

  const handleReverseList = () => {
    const reversedList = [...historicFoodProducts].reverse();
    setHistoricFoodProducts(reversedList);
    setHasListBeenReversed(!hasListBeenReversed);
  };

  const handleSearch = () => {
    navigation.navigate("SearchResultsScreen", { searchTerm: searchValue });
  };

  //View
  return (
    <Screen>
      {isScanning ? (
        <CameraScreen
          onBarcodeScanned={onBarcodeScanned}
          onExitClick={onExitClick}
        />
      ) : (
        <SearchScreen
          searchInputValue={searchValue}
          setSearchFieldInputValue={setSearchValue}
          onSearch={handleSearch}
          onScanButtonClick={onScanButtonClick}
          onReturnClick={handleReturnClick}
          foodProducts={historicFoodProducts}
          onSelect={handleFoodProductSelect}
          onReverseClick={handleReverseList}
          reversed={hasListBeenReversed}
        />
      )}
    </Screen>
  );
};

export default SearchScreenPresenter;

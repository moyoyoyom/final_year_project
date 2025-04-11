import { useState } from "react";
import SearchScreen from "../view/screens/SearchScreen";
import API from "../model/API";
import CameraScreen from "../view/screens/CameraScreen";
import Screen from "../view/UI/layout/Screen";
import { Camera, useCameraPermissions } from "expo-camera";
import { Alert } from "react-native";

const SearchScreenPresenter = ({ navigation }) => {
  //Initialisations
  const foodProducts = [
    {
      productID: 0,
      productName: "Nutella",
    },
    {
      productID: 1,
      productName: "Pizza",
    },
    {
      productID: 2,
      productName: "Ice cream",
    },
  ];

  //State
  const [searchValue, setSearchValue] = useState(" ");
  const [isScanning, setIsScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [hasPermissionBeenGranted, setHasPermissionBeenGranted] =
    useCameraPermissions();

  //Handlers
  const handleSubmit = (newValue) => {
    setSearchValue(newValue);
  };

  const onBarcodeScanned = async ({ data }) => {
    if (scanned) return;
    setScanned(true);
    const response = await API.get(
      `http://192.168.1.253:8090/api/foodproducts/barcode/${data}`
    );
    if (response.isSuccess) {
      navigation.navigate("FoodProductDetailsScreen", {
        foodProduct: response,
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
          onSubmit={handleSubmit}
          searchInputValue={searchValue}
          onScanButtonClick={onScanButtonClick}
          onReturnClick={handleReturnClick}
          foodProducts={foodProducts}
        />
      )}
    </Screen>
  );
};

export default SearchScreenPresenter;

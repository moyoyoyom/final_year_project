import { useState } from "react";

import SearchScreen from "../view/screens/SearchScreen";
import API from "../model/API";
import resultLoader from "../model/ResultLoader";
import CameraScreen from "../view/screens/CameraScreen";
import Screen from "../view/UI/layout/Screen";
import { Camera, useCameraPermissions } from "expo-camera";
import { Alert } from "react-native";

const SearchFieldPresenter = ({ navigation }) => {
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
        />
      )}
    </Screen>
  );
};

export default SearchFieldPresenter;

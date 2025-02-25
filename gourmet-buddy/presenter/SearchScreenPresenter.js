import { useState } from "react";

import SearchScreen from "../view/screens/SearchScreen";
import API from "../model/API";
import resultLoader from "../model/ResultLoader";
import CameraScreen from "../view/screens/CameraScreen";
import Screen from "../view/UI/layout/Screen";
import { Camera, useCameraPermissions } from "expo-camera";
import { Alert } from "react-native";

const SearchFieldPresenter = ({ navigation }) => {
  //Initialisations
  const productSearchEndpoint = "http://";
  const onBarcodeScanOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  //State
  const [searchValue, setSearchValue] = useState(" ");
  const [, , loadSearchResults] = resultLoader(productSearchEndpoint);
  const [isScanning, setIsScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [scannedFoodProductData, setScannedFoodProductData] = useState(null);
  const [hasPermissionBeenGranted, setHasPermissionBeenGranted] =
    useCameraPermissions();

  //Handlers
  const handleSubmit = (newValue) => {
    setSearchValue(newValue);
    console.log(searchValue);
  };

  const postSearch = async (search) => {
    const result = await API.post(productSearchEndpoint, search);
    if (result.isSuccess) {
      loadSearchResults(productSearchEndpoint);
    } else {
      Alert.alert(result.message);
    }
  };

  const goToResultsScreen = () =>
    navigation.navigate("SearchResultsScreen", { postSearch });

  /*const onBarcodeScanned = async ({ data }) => {
    console.log("scanning");
    try {
      if (scanned) return;
      setScanned(true);
      const response = await fetch(
        `http://192.168.1.253:8090/api/foodproducts/${data}`,
        onBarcodeScanOptions
      );
      const data = await response.json();
      setScannedFoodProductData(data);
      setIsScanning(false);
      console.log("done");
      navigation.navigate("FoodProductDetailsScreen", {
        foodProduct: scannedFoodProductData,
      });
    } catch (error) {
      navigation.navigate("SearchScreen");
      Alert.alert("Unable to scan this product");
      console.error(error);
    } finally {
      setTimeout(() => setScanned(false), 10000);
    }
  }; */

  const onBarcodeScanned = async ({ data }) => {
    console.log("Scanned data:", data);
    if (scanned) return;
    setScanned(true);
    try {
      const response = await fetch(
        `http://192.168.1.253:8090/api/foodproducts/${data}`,
        onBarcodeScanOptions
      );

      const textResponse = await response.text();
      console.log("Raw Response: ", textResponse);

      const result = JSON.parse(textResponse);
      setScannedFoodProductData(result);
    } catch (error) {
      console.error("Error fetching product: ", error);
    } finally {
      setTimeout(() => setScanned(false), 10000);
    }
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
          onSearch={goToResultsScreen}
          onSubmit={handleSubmit}
          searchInputValue={searchValue}
          isScanning={isScanning}
          setIsScanning={setIsScanning}
          onScanButtonClick={onScanButtonClick}
        />
      )}
    </Screen>
  );
};

export default SearchFieldPresenter;

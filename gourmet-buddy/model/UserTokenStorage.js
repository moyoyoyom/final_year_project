import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkUserAuthenticationStatus = async () => {
  try {
    return (await AsyncStorage.getItem("userToken")) !== null;
  } catch (error) {
    Alert.alert("Error checking your authentication status", error);
    return false;
  }
};

export const saveUserToken = async (token) => {
  try {
    await AsyncStorage.setItem("userToken", token);
  } catch (error) {
    Alert.alert("Error saving tokens for this session", error);
  }
};

export const logUserOut = async () => {
  try {
    await AsyncStorage.removeItem("userToken");
  } catch (error) {
    Alert.alert("Error trying to log user out", error);
  }
};

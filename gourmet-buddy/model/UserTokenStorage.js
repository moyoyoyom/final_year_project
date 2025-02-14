import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUserToken = async (token) => {
  try {
    await AsyncStorage.setItem("userToken", token);
  } catch (error) {
    Alert.alert("Error saving tokens for this session", error);
  }
};

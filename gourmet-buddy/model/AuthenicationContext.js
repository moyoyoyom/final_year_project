import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  //State
  const [user, setUser] = useState(null);
  const [isUserLoading, setUserIsLoading] = useState(true);

  useEffect(() => {
    const findStoredToken = async () => {
      try {
        const foundToken = await AsyncStorage.getItem("user");
        if (foundToken) {
          const decodedUser = jwtDecode(foundToken);
          setUser(decodedUser);
          console.log("Found user: ", decodedUser);
        } else {
          console.log("No user found");
        }
      } catch (error) {
        Alert.alert("Error finding user tokens: ", error);
      } finally {
        setUserIsLoading(false);
      }
    };
    findStoredToken();
  }, []);

  //Handlers
  const loginUser = async (token) => {
    try {
      await AsyncStorage.setItem("user", token);
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
      console.log(
        "Successfully logged in: ",
        await AsyncStorage.getItem("user")
      );
    } catch (error) {
      Alert.alert("Unable to log in: ", error);
    }
  };

  const logOutUser = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
      console.log(
        "Successfully logged out: ",
        await AsyncStorage.getItem("user")
      );
    } catch (error) {
      Alert.alert("Unable to log out: ", error);
    }
  };

  //Context
  return (
    <AuthenticationContext.Provider
      value={{ user, isUserLoading, loginUser, logOutUser }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

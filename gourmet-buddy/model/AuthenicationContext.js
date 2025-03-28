import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  //State
  const [user, setUser] = useState(null);
  const [isUserLoading, setUserIsLoading] = useState(true);

  useEffect(() => {
    const findStoredUser = async () => {
      try {
        const foundUser = await AsyncStorage.getItem("user");
        if (foundUser) {
          setUser(JSON.parse(foundUser));
          console.log("Found user: ", foundUser);
        } else {
          console.log("No user found");
        }
      } catch (error) {
        Alert.alert("Error finding user tokens: ", error);
      } finally {
        setUserIsLoading(false);
      }
    };
    findStoredUser();
  }, []);

  //Handlers
  const loginUser = async (user) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser({ ...user });
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

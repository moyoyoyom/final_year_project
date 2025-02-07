import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SearchScreenPresenter from "./presenter/SearchScreenPresenter";
import SearchResultsScreenPresenter from "./presenter/SearchResultsScreenPresenter";
import CreateAccountScreenPresenter from "./presenter/CreateAccountScreenPresenter";
import LoginScreenPresenter from "./presenter/LoginScreenPresenter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();

export const App = () => {
  //State
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  //Handlers
  const getLoginData = async () => {
    const loginData = await AsyncStorage.getItem("isUserLoggedIn");
    setIsUserLoggedIn(loginData);
  };

  useEffect(() => {
    getLoginData();
  }, []);

  //View
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isUserLoggedIn ? "LoginScreen" : "SearchScreen"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="CreateAccountScreen"
          component={CreateAccountScreenPresenter}
          options={{ title: " Create Account " }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreenPresenter}
          options={{ title: " Log In " }}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreenPresenter}
          options={{ title: "Search Screen" }}
        />
        <Stack.Screen
          name="SearchResultsScreen"
          component={SearchResultsScreenPresenter}
          options={{ title: " Results Screen " }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

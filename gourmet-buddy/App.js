import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SearchScreenPresenter from "./presenter/SearchScreenPresenter";
import SearchResultsScreenPresenter from "./presenter/SearchResultsScreenPresenter";
import CreateAccountScreenPresenter from "./presenter/CreateAccountScreenPresenter";
import LoginScreenPresenter from "./presenter/LoginScreenPresenter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import ProfileScreenPresenter from "./presenter/ProfileScreenPresenter";
import ExploreScreenPresenter from "./presenter/ExploreScreenPresenter";
import { saveUserToken } from "./model/UserTokenStorage";

const Stack = createNativeStackNavigator();

export const App = () => {
  //State
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const checkIfUserHasAToken = async () => {
      try {
        const foundToken = await AsyncStorage.getItem("userToken");
        setUserToken(foundToken);
      } catch (error) {
        Alert.alert("Problem finding token");
      }
    };
    checkIfUserHasAToken();
  }, []);

  //View
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={userToken ? "SearchScreen" : "LoginScreen"}
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
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreenPresenter}
          options={{ title: "Profile Screen" }}
        />
        <Stack.Screen
          name="ExploreScreen"
          component={ExploreScreenPresenter}
          options={{ title: "Explore Screen" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

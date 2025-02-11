import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SearchScreenPresenter from "./presenter/SearchScreenPresenter";
import SearchResultsScreenPresenter from "./presenter/SearchResultsScreenPresenter";
import CreateAccountScreenPresenter from "./presenter/CreateAccountScreenPresenter";
import LoginScreenPresenter from "./presenter/LoginScreenPresenter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileScreenPresenter from "./presenter/ProfileScreenPresenter";
import ExploreScreenPresenter from "./presenter/ExploreScreenPresenter";
import IntoleranceProfilePresenter from "./presenter/IntoleranceProfilePresenter";

const Stack = createNativeStackNavigator();

export const App = () => {
  //State
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const checkIfUserHasAToken = async () => {
      try {
        const foundToken = await AsyncStorage.getItem("userToken");
        console.log("Retrieved this token: ", foundToken);
        setUserToken(foundToken);
      } catch (error) {
        Alert.alert("Problem finding token");
      }
    };
    checkIfUserHasAToken();
  }, []);

  useEffect(() => {
    console.log(userToken);
  }, [userToken]);

  //View
  return (
    <NavigationContainer key={userToken ? "loggedIn" : "notLoggedIn"}>
      <Stack.Navigator
        initialRouteName="IntoleranceProfilePresenter" //{userToken != null ? "SearchScreen" : "LoginScreen"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SearchScreen" options={{ title: "Search Screen" }}>
          {(props) => <SearchScreenPresenter {...props} />}
        </Stack.Screen>
        <Stack.Screen name="LoginScreen" options={{ title: " Log In " }}>
          {(props) => <LoginScreenPresenter {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="IntoleranceProfilePresenter"
          component={IntoleranceProfilePresenter}
        />
        <Stack.Screen
          name="CreateAccountScreen"
          component={CreateAccountScreenPresenter}
          options={{ title: " Create Account " }}
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

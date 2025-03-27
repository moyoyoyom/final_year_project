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
import DislikeProfilePresenter from "./presenter/DislikeProfilePresenter";
import FoodProductDetailsScreenPresenter from "./presenter/FoodProductDetailsScreenPreseneter";

const Stack = createNativeStackNavigator();

export const App = () => {
  //State
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const checkIfUserHasAToken = async () => {
      try {
        const foundToken = await AsyncStorage.getItem("userToken");
        setUserToken(foundToken);
        console.log("Found token: ", foundToken);
      } catch (error) {
        Alert.alert("Problem finding token");
      }
    };
    checkIfUserHasAToken();
  }, []);

  //View
  return (
    <NavigationContainer key={userToken}>
      <Stack.Navigator
        initialRouteName={userToken != null ? "SearchScreen" : "LoginScreen"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SearchScreen">
          {(props) => <SearchScreenPresenter {...props} />}
        </Stack.Screen>
        <Stack.Screen name="LoginScreen">
          {(props) => <LoginScreenPresenter {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="IntoleranceProfileScreen"
          component={IntoleranceProfilePresenter}
        />
        <Stack.Screen
          name="CreateAccountScreen"
          component={CreateAccountScreenPresenter}
        />
        <Stack.Screen
          name="SearchResultsScreen"
          component={SearchResultsScreenPresenter}
        />
        <Stack.Screen name="ProfileScreen" component={ProfileScreenPresenter} />
        <Stack.Screen name="ExploreScreen" component={ExploreScreenPresenter} />
        <Stack.Screen
          name="DislikeProfileScreen"
          component={DislikeProfilePresenter}
        />
        <Stack.Screen
          name="FoodProductDetailsScreen"
          component={FoodProductDetailsScreenPresenter}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

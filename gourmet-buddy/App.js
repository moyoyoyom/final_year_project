import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SearchScreenPresenter from "./presenter/SearchScreenPresenter";
import SearchResultsScreenPresenter from "./presenter/SearchResultsScreenPresenter";
import CreateAccountScreenPresenter from "./presenter/CreateAccountScreenPresenter";
import LoginScreenPresenter from "./presenter/LoginScreenPresenter";

const Stack = createNativeStackNavigator();

export const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CreateAccountScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
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
          name="CreateAccountScreen"
          component={CreateAccountScreenPresenter}
          options={{ title: " Create Account " }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreenPresenter}
          options={{ title: " Log In " }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

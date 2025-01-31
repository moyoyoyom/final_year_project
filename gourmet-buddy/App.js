import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SearchScreenPresenter from "./presenter/SearchScreenPresenter";
import SearchResultsScreenPresenter from "./presenter/SearchResultsScreenPresenter";

const Stack = createNativeStackNavigator();

export const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SearchScreen"
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

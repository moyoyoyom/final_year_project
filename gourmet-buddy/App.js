import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "./view/screens/SearchScreen";

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
          component={SearchScreen}
          options={{ title: "Search Screen" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

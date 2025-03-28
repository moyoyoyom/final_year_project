import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import {
  AuthenticationContext,
  AuthenticationProvider,
} from "./model/AuthenicationContext";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./navigation/AppStack";
import AuthenticationStack from "./navigation/AuthenticationStack";
import LoadingScreen from "./view/screens/LoadingScreen";

//Stack Navigators
const MainStack = createNativeStackNavigator();

const MainNavigator = () => {
  const { user, isUserLoading } = useContext(AuthenticationContext);

  if (isUserLoading) {
    return <LoadingScreen />;
  }

  return (
    <MainStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={user ? "AppStack" : "AuthenticationStack"}
    >
      <MainStack.Screen
        name="AuthenticationStack"
        component={AuthenticationStack}
      />
      <MainStack.Screen name="AppStack" component={AppStack} />
    </MainStack.Navigator>
  );
};

const App = () => {
  return (
    <AuthenticationProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AuthenticationProvider>
  );
};

export default App;

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreenPresenter from "./presenter/SearchScreenPresenter";
import SearchResultsScreenPresenter from "./presenter/SearchResultsScreenPresenter";
import CreateAccountScreenPresenter from "./presenter/CreateAccountScreenPresenter";
import LoginScreenPresenter from "./presenter/LoginScreenPresenter";
import ProfileScreenPresenter from "./presenter/ProfileScreenPresenter";
import ExploreScreenPresenter from "./presenter/ExploreScreenPresenter";
import IntoleranceProfilePresenter from "./presenter/IntoleranceProfilePresenter";
import DislikeProfilePresenter from "./presenter/DislikeProfilePresenter";
import FoodProductDetailsScreenPresenter from "./presenter/FoodProductDetailsScreenPreseneter";
import { useContext } from "react";
import {
  AuthenticationContext,
  AuthenticationProvider,
} from "./model/AuthenicationContext";
import LoadingScreen from "./view/screens/LoadingScreen";
import { NavigationContainer } from "@react-navigation/native";

//Stack Navigators
const AuthenticationStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

//Navigator Screens
const AuthenticationScreens = () => {
  <AuthenticationStack.Navigator>
    <AuthenticationStack.Screen
      name="LoginScreen"
      component={LoginScreenPresenter}
    />
    <AuthenticationStack.Screen
      name="CreateAccountScreen"
      component={CreateAccountScreenPresenter}
    />
  </AuthenticationStack.Navigator>;
};

const AppScreens = () => {
  <AppStack.Navigator>
    <AppStack.Screen name="SearchScreen" component={SearchScreenPresenter} />
    <AppStack.Screen
      name="IntoleranceProfileScreen"
      component={IntoleranceProfilePresenter}
    />
    <AppStack.Screen
      name="CreateAccountScreen"
      component={CreateAccountScreenPresenter}
    />
    <AppStack.Screen
      name="SearchResultsScreen"
      component={SearchResultsScreenPresenter}
    />
    <AppStack.Screen name="ProfileScreen" component={ProfileScreenPresenter} />
    <AppStack.Screen name="ExploreScreen" component={ExploreScreenPresenter} />
    <AppStack.Screen
      name="DislikeProfileScreen"
      component={DislikeProfilePresenter}
    />
    <AppStack.Screen
      name="FoodProductDetailsScreen"
      component={FoodProductDetailsScreenPresenter}
    />
  </AppStack.Navigator>;
};

const MainNavigator = () => {
  const { user, isUserLoading } = useContext(AuthenticationContext);

  if (isUserLoading) {
    return <LoadingScreen />;
  }

  return user ? <AppScreens /> : <AuthenticationScreens />;
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

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreenPresenter from "../presenter/LoginScreenPresenter";
import CreateAccountScreenPresenter from "../presenter/CreateAccountScreenPresenter";
import IntoleranceProfilePresenter from "../presenter/IntoleranceProfilePresenter";
import DislikeProfilePresenter from "../presenter/DislikeProfilePresenter";

const Stack = createNativeStackNavigator();

const AuthenticationStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LoginScreen" component={LoginScreenPresenter} />
    <Stack.Screen
      name="CreateAccountScreen"
      component={CreateAccountScreenPresenter}
    />
    <Stack.Screen
      name="IntoleranceProfileScreen"
      component={IntoleranceProfilePresenter}
    />
    <Stack.Screen
      name="DislikeProfileScreen"
      component={DislikeProfilePresenter}
    />
  </Stack.Navigator>
);

export default AuthenticationStack;

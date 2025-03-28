import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreenPresenter from "../presenter/SearchScreenPresenter";
import SearchResultsScreenPresenter from "../presenter/SearchResultsScreenPresenter";
import ProfileScreenPresenter from "../presenter/ProfileScreenPresenter";
import ExploreScreenPresenter from "../presenter/ExploreScreenPresenter";
import FoodProductDetailsScreenPresenter from "../presenter/FoodProductDetailsScreenPreseneter";

const Stack = createNativeStackNavigator();

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SearchScreen" component={SearchScreenPresenter} />
    <Stack.Screen
      name="SearchResultsScreen"
      component={SearchResultsScreenPresenter}
    />
    <Stack.Screen name="ProfileScreen" component={ProfileScreenPresenter} />
    <Stack.Screen name="ExploreScreen" component={ExploreScreenPresenter} />
    <Stack.Screen
      name="FoodProductDetailsScreen"
      component={FoodProductDetailsScreenPresenter}
    />
  </Stack.Navigator>
);

export default AppStack;

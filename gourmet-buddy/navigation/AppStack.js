import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreenPresenter from "../presenter/SearchScreenPresenter";
import SearchResultsScreenPresenter from "../presenter/SearchResultsScreenPresenter";
import ProfileScreenPresenter from "../presenter/ProfileScreenPresenter";
import ExploreScreenPresenter from "../presenter/ExploreScreenPresenter";
import FoodProductDetailsScreenPresenter from "../presenter/FoodProductDetailsScreenPresenter";
import LearnMorePresenter from "../presenter/LearnMorePresenter";
import LikedProductsPresenter from "../presenter/LikedProductsPresenter";
import SavedProductsPresenter from "../presenter/SavedProductsPresenter";

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
    <Stack.Screen name="LearnMoreScreen" component={LearnMorePresenter} />
    <Stack.Screen
      name="LikedProductsScreen"
      component={LikedProductsPresenter}
    />
    <Stack.Screen
      name="SavedProductsScreen"
      component={SavedProductsPresenter}
    />
  </Stack.Navigator>
);

export default AppStack;

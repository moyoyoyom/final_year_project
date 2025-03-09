import { ActivityIndicator, Text } from "react-native";
import Screen from "../UI/layout/Screen";

const LoadingScreen = () => {
  //View
  return (
    <Screen>
      <Text>Loading...</Text>
      <ActivityIndicator size={"large"} />
    </Screen>
  );
};

export default LoadingScreen;

import { ActivityIndicator, StyleSheet, Text } from "react-native";
import Screen from "../UI/layout/Screen";

const LoadingScreen = () => {
  //View
  return (
    <Screen>
      <Text style={styles.loadingTextStyle}>Loading...</Text>
      <ActivityIndicator size={"large"} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  loadingTextStyle: {
    marginTop: 100,
    padding: 20,
    fontWeight: 600,
  },
});

export default LoadingScreen;

import { StyleSheet, View } from "react-native";

import { StatusBar } from "expo-status-bar";

const Screen = ({ children }) => {
  //View
  return (
    <View style={styles.screenStyle}>
      {children}
      <StatusBar style="dark"></StatusBar>
    </View>
  );
};

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

export default Screen;

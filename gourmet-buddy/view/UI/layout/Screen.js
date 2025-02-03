import { StyleSheet, View } from "react-native";

import { StatusBar } from "expo-status-bar";

const Screen = ({ children, screenStyle }) => {
  return (
    <View style={[styles.screenStyle, screenStyle]}>
      {children}
      <StatusBar style="light"></StatusBar>
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

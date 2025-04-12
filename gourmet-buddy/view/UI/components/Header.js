import { StyleSheet, TouchableOpacity, View } from "react-native";

const Header = ({ leftItem, centerItem, rightItem, customHeaderStyle }) => {
  return (
    <View style={[styles.headerStyle, customHeaderStyle]}>
      {leftItem ? <TouchableOpacity>{leftItem}</TouchableOpacity> : null}
      {centerItem ? <TouchableOpacity>{centerItem}</TouchableOpacity> : null}
      {rightItem ? <TouchableOpacity>{rightItem}</TouchableOpacity> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0B3007",
    paddingTop: 60,
    paddingBottom: 10,
    marginBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    width: "100%",
    height: 120,
  },
  headerContent: {
    flex: 1,
  },
  headerItem: {
    color: "white",
  },
});

export default Header;

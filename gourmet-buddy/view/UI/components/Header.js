import { StyleSheet, View } from "react-native";

const Header = ({ leftItem, centerItem, rightItem }) => {
  return (
    <View style={styles.headerStyle}>
      {leftItem ? <View>{leftItem}</View> : null}
      {centerItem ? <View>{centerItem}</View> : null}
      {rightItem ? <View>{rightItem}</View> : null}
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
    height: "13%",
  },
  headerContent: {
    flex: 1,
  },
  headerItem: {
    color: "white",
  },
});

export default Header;

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
    backgroundColor: "blue",
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 15,
    width: "100%",
  },
  headerContent: {
    flex: 1,
  },
});

export default Header;

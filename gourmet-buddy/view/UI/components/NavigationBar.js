import { StyleSheet, View } from "react-native";
import Icons from "./Icons";

const NavigationBar = () => {
  //Initialisations
  const iconSize = 40;
  const iconColor = "#0B3007";
  //View
  return (
    <View style={styles.navBarContainer}>
      <Icons.ExploreIcon color={iconColor} size={iconSize} />
      <Icons.SearchIcon color={iconColor} size={iconSize} />
      <Icons.ProfileIcon color={iconColor} size={iconSize} />
    </View>
  );
};

const styles = StyleSheet.create({
  navBarContainer: {
    width: "100%",
    height: "9%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: "#0B3007",
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default NavigationBar;

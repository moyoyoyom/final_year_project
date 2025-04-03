import { Pressable, StyleSheet, View } from "react-native";
import Icons from "./Icons";

const NavigationBar = ({ onExplorePress, onSearchPress, onProfilePress }) => {
  //Initialisations
  const iconSize = 40;
  const iconColor = "#0B3007";
  //View
  return (
    <View style={styles.navBarContainer}>
      <Pressable onPress={onExplorePress}>
        <Icons.ExploreIcon color={iconColor} size={iconSize} />
      </Pressable>
      <Pressable onPress={onSearchPress}>
        <Icons.SearchIcon color={iconColor} size={iconSize} />
      </Pressable>
      <Pressable onPress={onProfilePress}>
        <Icons.ProfileIcon color={iconColor} size={iconSize} />
      </Pressable>
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
    position: "absolute",
    bottom: 0,
  },
});

export default NavigationBar;

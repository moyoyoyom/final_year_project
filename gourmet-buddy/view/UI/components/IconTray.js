import { StyleSheet, View } from "react-native";
import Icons from "./Icons";

const IconTray = () => {
  return (
    <View style={styles.iconTrayStyle}>
      <Icons.LikeIcon size={30} />
      <Icons.BuyIcon size={30} />
      <Icons.SaveIcon size={30} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconTrayStyle: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default IconTray;

import { StyleSheet, View } from "react-native";
import Icons from "./Icons";

const IconTray = ({ onLikeClick, onBuyClick, onSaveClick }) => {
  return (
    <View style={styles.iconTrayStyle}>
      <Icons.LikeIcon size={30} onPress={onLikeClick} />
      <Icons.BuyIcon size={30} onPress={onBuyClick} />
      <Icons.SaveIcon size={30} onPress={onSaveClick} />
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

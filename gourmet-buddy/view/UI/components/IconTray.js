import { StyleSheet, View } from "react-native";
import Icons from "./Icons";

const IconTray = ({
  onLikeClick,
  onBuyClick,
  onSaveClick,
  likeStatus,
  saveStatus,
}) => {
  return (
    <View style={styles.iconTrayStyle}>
      {likeStatus === "LIKED" ? (
        <Icons.FilledHeartIcon size={30} onPress={onLikeClick} color={"red"} />
      ) : (
        <Icons.LikeIcon size={30} onPress={onLikeClick} />
      )}
      <Icons.BuyIcon size={30} onPress={onBuyClick} />
      {saveStatus === "SAVED" ? (
        <Icons.FilledSaveIcon size={30} onPress={onSaveClick} color={"black"} />
      ) : (
        <Icons.SaveIcon size={30} onPress={onSaveClick} />
      )}
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

import { StyleSheet, Text, View } from "react-native";
import Divider from "../UI/components/Divider";

const ProfileItem = ({ itemText, icon }) => {
  return (
    <View>
      <View style={styles.lineStyle}>
        <View style={styles.iconStyle}>{icon}</View>
        <Text style={styles.textStyle}>{itemText}</Text>
      </View>
      <Divider customDividerStyle={styles.dividerStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  dividerStyle: {
    width: 350,
    margin: 0,
  },
  textStyle: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 8,
    marginTop: 8,
  },
  lineStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: {
    marginLeft: 10,
  },
});

export default ProfileItem;

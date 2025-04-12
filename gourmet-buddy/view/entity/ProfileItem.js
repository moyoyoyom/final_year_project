import { StyleSheet, Text, View } from "react-native";
import Divider from "../UI/components/Divider";

const ProfileItem = ({ itemText, icon }) => {
  return (
    <View>
      <View style={styles.lineStyle}>
        <View>{icon}</View>
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
    marginBottom: 5,
    marginTop: 5,
  },
  lineStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: {
    height: 20,
    width: 20,
  },
});

export default ProfileItem;

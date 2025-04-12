import { StyleSheet, Text, View } from "react-native";
import Divider from "../UI/components/Divider";

const ProfileItem = ({ itemText, icon }) => {
  return (
    <View>
      <View>{icon}</View>
      <Text>{itemText}</Text>
      <Divider customDividerStyle={styles.dividerStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  dividerStyle: {
    width: 350,
    margin: 0,
  },
});

export default ProfileItem;

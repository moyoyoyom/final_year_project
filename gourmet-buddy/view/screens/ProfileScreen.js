import { Pressable, StyleSheet, Text } from "react-native";
import Screen from "../UI/layout/Screen";

const ProfileScreen = ({ onLogoutPress }) => {
  return (
    <Screen>
      <Pressable onPress={onLogoutPress} style={styles.centering}>
        <Text> Log out </Text>
      </Pressable>
    </Screen>
  );
};

const styles = StyleSheet.create({
  centering: {
    padding: 50,
  },
});

export default ProfileScreen;

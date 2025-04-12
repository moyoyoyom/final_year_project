import { Pressable, StyleSheet, Text } from "react-native";
import Screen from "../UI/layout/Screen";
import Header from "../UI/components/Header";
import { useContext } from "react";
import { AuthenticationContext } from "../../model/AuthenicationContext";
import ProfileItem from "../entity/ProfileItem";
import NavigationBarPresenter from "../../presenter/NavigationBarPresenter";

const ProfileScreen = ({ onLogoutPress }) => {
  //Initialisations
  const { user } = useContext(AuthenticationContext);
  return (
    <Screen>
      <Header />
      <Text>{user.sub}</Text>
      <ProfileItem itemText={"Personal Details"} />
      <ProfileItem itemText={"Preferences and Intolerances"} />
      <ProfileItem itemText={"Liked Products"} />
      <ProfileItem itemText={"Saved Products"} />
      <ProfileItem itemText={"Localisation and units"} />
      <ProfileItem itemText={"Account Settings"} />
      <Pressable onPress={onLogoutPress} style={styles.centering}>
        <Text> Log out </Text>
      </Pressable>
      <NavigationBarPresenter />
    </Screen>
  );
};

const styles = StyleSheet.create({
  centering: {
    padding: 50,
  },
});

export default ProfileScreen;

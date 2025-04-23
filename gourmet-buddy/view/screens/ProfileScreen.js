import { Pressable, StyleSheet, Text } from "react-native";
import Screen from "../UI/layout/Screen";
import Header from "../UI/components/Header";
import { useContext } from "react";
import { AuthenticationContext } from "../../model/AuthenicationContext";
import ProfileItem from "../entity/ProfileItem";
import NavigationBarPresenter from "../../presenter/NavigationBarPresenter";
import Icons from "../UI/components/Icons";

const ProfileScreen = ({ onLogoutPress, onLikedProductsClick }) => {
  //Initialisations
  const { user } = useContext(AuthenticationContext);
  return (
    <Screen>
      <Header />
      <Text style={styles.usernameStyle}>{user.sub}</Text>
      <ProfileItem
        itemText={"Personal Details"}
        icon={<Icons.ProfileIcon size={24} />}
      />
      <ProfileItem
        itemText={"Preferences and Intolerances"}
        icon={<Icons.FoodIcon size={24} />}
      />
      <ProfileItem
        itemText={"Liked Products"}
        icon={<Icons.LikeIcon size={24} />}
        onPress={onLikedProductsClick}
      />
      <ProfileItem
        itemText={"Saved Products"}
        icon={<Icons.SaveIcon size={24} />}
      />
      <ProfileItem
        itemText={"Account Settings"}
        icon={<Icons.SettingsIcon size={24} />}
      />
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
  usernameStyle: {
    fontSize: 20,
    fontWeight: 600,
    marginTop: 100,
    marginBottom: 200,
  },
});

export default ProfileScreen;

import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import Button from "../../components/Button";
import Screen from "../../layout/Screen";

const AuthenticationScreen = ({
  onAuthenticateClick,
  usernameValue,
  passwordValue,
  onUsernameChange,
  onPasswordChange,
  onPageSwitch,
  type,
}) => {
  //Initialisations
  const pageTitle =
    type == "Login" ? "Log In to Your Account" : "Create Your Account";
  const authenticateButtonText = type == "Login" ? "Log In" : "Sign Up";
  const switchPageText =
    type == "Login" ? "Don't have an account?" : "Already have an account?";
  const switchPageLink = type == "Login" ? "Sign Up" : "Log In";

  //View
  return (
    <Screen screenStyle={styles.backgroundStyle}>
      <Text style={styles.titleStyle}> {pageTitle} </Text>
      <View style={styles.loginBackground}>
        <Text style={styles.infoStyling}> Username </Text>
        <TextInput
          style={styles.inputStyling}
          value={usernameValue}
          onChangeText={onUsernameChange}
        />
        <Text style={styles.infoStyling}> Password </Text>
        <TextInput
          style={styles.inputStyling}
          value={passwordValue}
          onChangeText={onPasswordChange}
          secureTextEntry={true}
        />
        <Button
          buttonText={authenticateButtonText}
          buttonStyle={styles.loginButton}
          labelStyle={styles.loginLabelStyle}
          onClick={onAuthenticateClick}
        />
        <View style={styles.alternativePane}>
          <Text> {switchPageText} </Text>
          <Pressable onPress={onPageSwitch} style={styles.pressableStyle}>
            <Text style={styles.linkStyle}> {switchPageLink} </Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "#D5DBB8",
  },
  titleStyle: {
    color: "#fff",
    fontWeight: 600,
    fontSize: 30,
    marginTop: 70,
    flex: 1,
  },
  loginBackground: {
    backgroundColor: "#fff",
    height: "70%",
    width: "100%",
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    padding: 50,
  },
  infoStyling: {
    fontWeight: 500,
    fontSize: 16,
  },
  inputStyling: {
    borderBottomColor: "#0B3007",
    borderBottomWidth: 1.2,
    marginBottom: 30,
    fontSize: 20,
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: "#0B3007",
    height: 50,
    width: 150,
    alignSelf: "center",
  },
  loginLabelStyle: {
    color: "#FFDC7A",
    fontWeight: "bold",
  },
  alternativePane: {
    alignSelf: "flex-end",
    paddingTop: 30,
  },
  pressableStyle: {
    alignSelf: "flex-end",
  },
  linkStyle: {
    fontWeight: 700,
  },
});

export default AuthenticationScreen;

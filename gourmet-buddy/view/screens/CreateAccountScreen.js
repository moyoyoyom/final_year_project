import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import Button from "../UI/components/Button";
import Screen from "../UI/layout/Screen";

const CreateAccountScreen = (onPress) => {
  return (
    <Screen screenStyle={styles.backgroundStyle}>
      <Text style={styles.titleStyle}> Create Your Account </Text>
      <View style={styles.loginBackground}>
        <Text style={styles.infoStyling}> Username </Text>
        <TextInput style={styles.inputStyling} />
        <Text style={styles.infoStyling}> Password </Text>
        <TextInput style={styles.inputStyling} />
        <Button
          buttonText={"Sign Up"}
          buttonStyle={styles.loginButton}
          labelStyle={styles.loginLabelStyle}
        />
        <View style={styles.alternativePane}>
          <Text> Already have an account? </Text>
          <Pressable onPress={onPress} style={styles.pressableStyle}>
            <Text style={styles.linkStyle}> Log In </Text>
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

export default CreateAccountScreen;

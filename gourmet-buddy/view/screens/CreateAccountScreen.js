import { StyleSheet, Text, TextInput, View } from "react-native";
import Screen from "../UI/layout/Screen";

const CreateAccountScreen = () => {
  return (
    <Screen screenStyle={styles.backgroundStyle}>
      <Text style={styles.titleStyle}> Create Your Account </Text>
      <View style={styles.loginBackground}>
        <Text style={styles.infoStyling}> Username </Text>
        <TextInput style={styles.inputStyling} />
        <Text style={styles.infoStyling}> Password </Text>
        <TextInput style={styles.inputStyling} />
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
  },
});

export default CreateAccountScreen;

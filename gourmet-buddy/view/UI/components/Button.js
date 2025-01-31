import { Pressable, StyleSheet, Text } from "react-native";

const Button = ({
  buttonText,
  buttonIcon,
  onClick,
  labelStyle,
  buttonStyle,
}) => {
  return (
    <Pressable
      onPress={onClick}
      style={[styles.defaultButtonStyle, buttonStyle]}
    >
      {buttonIcon ? buttonIcon : null}
      <Text style={[styles.defaultLabelStyle, labelStyle]}> {buttonText}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  defaultButtonStyle: {
    minHeight: 20,
    borderWidth: 1,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    flexDirection: "row",
    gap: 5,
  },
  defaultLabelStyle: {
    fontSize: 16,
  },
});

export default Button;

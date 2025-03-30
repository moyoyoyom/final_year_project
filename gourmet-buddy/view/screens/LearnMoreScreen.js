import { Image, StyleSheet, Text, View } from "react-native";
import Screen from "../UI/layout/Screen";
import NavigationBarPresenter from "../../presenter/NavigationBarPresenter";
import Header from "../UI/components/Header";
import Icons from "../UI/components/Icons";

const LearnMoreScreen = ({ foodProduct, onBackClick }) => {
  return (
    <Screen>
      <Header
        customHeaderStyle={styles.headerStyle}
        leftItem={
          <Icons.ReturnIcon color={"#FFDC7A"} size={30} onPress={onBackClick} />
        }
      />
      <View style={styles.titleRowLayout}>
        <Image
          source={{ uri: foodProduct.result.image_url }}
          style={styles.imageStyling}
        />
        <View style={styles.productInfoPaneStyle}>
          <Text style={styles.titleStyle}>
            {foodProduct.result.brands} {foodProduct.result.product_name}
            {foodProduct.result.quantity}
          </Text>
          <Text>
            {foodProduct.result.nutriments?.["energy-kcal"]} kcal per 100g
          </Text>
        </View>
      </View>
      <NavigationBarPresenter />
    </Screen>
  );
};

const styles = StyleSheet.create({
  imageStyling: {
    minHeight: 150,
    minWidth: 150,
    borderRadius: 20,
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 5,
  },
  titleRowLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productInfoPaneStyle: {
    width: "45%",
    marginLeft: 20,
  },
});

export default LearnMoreScreen;

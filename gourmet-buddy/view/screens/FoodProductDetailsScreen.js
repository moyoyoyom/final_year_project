import { Image, StyleSheet, Text, View } from "react-native";
import Button from "../UI/components/Button";
import Screen from "../UI/layout/Screen";
import Header from "../UI/components/Header";
import IconTray from "../UI/components/IconTray";
import FormattedIngredientText from "../UI/components/FormattedIngredientText";
import Icons from "../UI/components/Icons";

const FoodProductDetailsScreen = ({
  foodProduct,
  userSensitivities,
  onBackClick,
}) => {
  //View
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
            {foodProduct.result.brands} {foodProduct.result.product_name} -{" "}
            {foodProduct.result.quantity}
          </Text>
          <IconTray />
          <Button
            buttonText={"Learn more"}
            labelStyle={styles.infoButtonLabelStyle}
            buttonStyle={styles.infoButtonStyle}
          />
        </View>
      </View>
      <View style={styles.ingredientsInfoPaneStyle}>
        <Text style={styles.titleStyle}>Ingredients:</Text>
        <FormattedIngredientText
          ingredientText={foodProduct.result.ingredients_text}
          highlightStyle={styles.sensitivityHighlightStyle}
          keyIngredients={userSensitivities}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  imageStyling: {
    minHeight: 150,
    minWidth: 150,
    borderRadius: 20,
  },
  titleRowLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 5,
  },
  headerStyle: {
    marginBottom: 40,
  },
  infoButtonLabelStyle: {
    fontWeight: 500,
    fontSize: 14,
  },
  infoButtonStyle: {
    marginTop: 15,
    padding: 7,
  },
  productInfoPaneStyle: {
    width: "45%",
  },
  ingredientsInfoPaneStyle: {
    marginTop: 20,
    margin: 20,
  },
  sensitivityHighlightStyle: {
    fontWeight: "600",
    color: "red",
  },
});

export default FoodProductDetailsScreen;

import { Image, StyleSheet, Text, View } from "react-native";
import Button from "../UI/components/Button";
import Screen from "../UI/layout/Screen";
import Header from "../UI/components/Header";
import IconTray from "../UI/components/IconTray";
import FormattedIngredientText from "../UI/components/FormattedIngredientText";
import Icons from "../UI/components/Icons";
import NavigationBarPresenter from "../../presenter/NavigationBarPresenter";

const FoodProductDetailsScreen = ({
  foodProduct,
  userSensitivities,
  dislikedIngredients,
  onBackClick,
  onLearnMoreClick,
  onLikeClick,
  onSaveClick,
  likeStatus,
  saveStatus,
}) => {
  //Initialisations
  const imageURL =
    foodProduct.image_url === null || foodProduct.image_url.trim().length === 0
      ? "https://hadramut.com/_nuxt/img/placeholder.d41418b.jpg"
      : foodProduct.image_url;

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
        <Image source={{ uri: imageURL }} style={styles.imageStyling} />
        <View style={styles.productInfoPaneStyle}>
          <Text style={styles.titleStyle}>
            {foodProduct.brands} {foodProduct.product_name} -{" "}
            {foodProduct.quantity}
          </Text>
          <IconTray
            likeStatus={likeStatus}
            saveStatus={saveStatus}
            onLikeClick={onLikeClick}
            onSaveClick={onSaveClick}
          />
          <Button
            buttonText={"Learn more"}
            labelStyle={styles.infoButtonLabelStyle}
            buttonStyle={styles.infoButtonStyle}
            onClick={onLearnMoreClick}
          />
        </View>
      </View>
      <View style={styles.ingredientsInfoPaneStyle}>
        <Text style={styles.titleStyle}>Ingredients:</Text>
        {foodProduct.ingredients_text ? (
          <FormattedIngredientText
            ingredientText={foodProduct.ingredients_text}
            highlightStyle={styles.sensitivityHighlightStyle}
            dislikeHighlightStyle={styles.dislikeHighlightStyle}
            keyIngredients={userSensitivities}
            dislikedIngredients={dislikedIngredients}
          />
        ) : (
          <Text> Missing information </Text>
        )}
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
  dislikeHighlightStyle: {
    fontWeight: "500",
    color: "orange",
  },
});

export default FoodProductDetailsScreen;

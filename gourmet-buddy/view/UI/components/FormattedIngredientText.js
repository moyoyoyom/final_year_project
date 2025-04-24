import { Text } from "react-native";

const FormattedIngredientText = ({
  ingredientText,
  keyIngredients,
  dislikedIngredients,
  highlightStyle,
  dislikeHighlightStyle,
}) => {
  //Initialisations
  const words = ingredientText.split(/(\s+)/);
  const formattedIngredientsArray = keyIngredients.map((ingredient) =>
    ingredient.toUpperCase()
  );

  //View
  return (
    <Text>
      {words.map((word, index) => {
        const wordWithNoPunctuation = word.replace(
          /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
          ""
        );
        if (
          formattedIngredientsArray.includes(
            wordWithNoPunctuation.toUpperCase()
          )
        ) {
          return (
            <Text key={index} style={highlightStyle}>
              {word}
            </Text>
          );
        }
        return <Text key={index}>{word}</Text>;
      })}
    </Text>
  );
};

export default FormattedIngredientText;

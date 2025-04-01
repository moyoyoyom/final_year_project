const formatNutriments = ({ foodProduct }) => {
  const productNutriments = [
    {
      nutriment: "carbohydratesPer100g",
      amount: foodProduct.result.nutriments?.["carbohydrates_100g"],
    },
    {
      nutriment: "calories",
      amount: foodProduct.result.nutriments?.["energy-kcal"],
    },
    {
      nutriment: "fatPer100g",
      amount: foodProduct.result.nutriments?.["fat_100g"],
    },
    {
      nutriment: "fiberPer100g",
      amount: foodProduct.result.nutriments?.["fiber_100g"],
    },
    {
      nutriment: "proteinsPer100g",
      amount: foodProduct.result.nutriments?.["proteins_100g"],
    },
    {
      nutriment: "saltPer100g",
      amount: foodProduct.result.nutriments?.["salt_100g"],
    },
    {
      nutriment: "saturatedFatPer100g",
      amount: foodProduct.result.nutriments?.["saturated-fat_100g"],
    },
    {
      nutriment: "sodiumPer100g",
      amount: foodProduct.result.nutriments?.["sodium_100g"],
    },
    {
      nutriment: "sugarsPer100g",
      amount: foodProduct.result.nutriments?.["sugars_100g"],
    },
  ];
  return productNutriments;
};

export default formatNutriments;

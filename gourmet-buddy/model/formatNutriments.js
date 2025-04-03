const formatNutriments = (foodProduct) => {
  const productNutriments = [
    {
      nutriment: "Carbohydrates",
      amount: foodProduct.result.nutriments?.["carbohydrates_100g"],
    },
    {
      nutriment: "Calories",
      amount: foodProduct.result.nutriments?.["energy-kcal"],
    },
    {
      nutriment: "Fat",
      amount: foodProduct.result.nutriments?.["fat_100g"],
    },
    {
      nutriment: "Fiber",
      amount: foodProduct.result.nutriments?.["fiber_100g"],
    },
    {
      nutriment: "Protein",
      amount: foodProduct.result.nutriments?.["proteins_100g"],
    },
    {
      nutriment: "Salt",
      amount: foodProduct.result.nutriments?.["salt_100g"],
    },
    {
      nutriment: "Saturates",
      amount: foodProduct.result.nutriments?.["saturated-fat_100g"],
    },
    {
      nutriment: "Sodium",
      amount: foodProduct.result.nutriments?.["sodium_100g"],
    },
    {
      nutriment: "Sugar",
      amount: foodProduct.result.nutriments?.["sugars_100g"],
    },
  ];
  return productNutriments;
};

export default formatNutriments;

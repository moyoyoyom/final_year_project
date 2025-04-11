const formatNutriments = (foodProduct) => {
  const productNutriments = [
    {
      nutriment: "Carbohydrates",
      amount: foodProduct.nutriments?.["carbohydrates_100g"],
    },
    {
      nutriment: "Calories",
      amount: foodProduct.nutriments?.["energy-kcal"],
    },
    {
      nutriment: "Fat",
      amount: foodProduct.nutriments?.["fat_100g"],
    },
    {
      nutriment: "Fiber",
      amount: foodProduct.nutriments?.["fiber_100g"],
    },
    {
      nutriment: "Protein",
      amount: foodProduct.nutriments?.["proteins_100g"],
    },
    {
      nutriment: "Salt",
      amount: foodProduct.nutriments?.["salt_100g"],
    },
    {
      nutriment: "Saturates",
      amount: foodProduct.nutriments?.["saturated-fat_100g"],
    },
    {
      nutriment: "Sodium",
      amount: foodProduct.nutriments?.["sodium_100g"],
    },
    {
      nutriment: "Sugar",
      amount: foodProduct.nutriments?.["sugars_100g"],
    },
  ];
  return productNutriments;
};

export default formatNutriments;

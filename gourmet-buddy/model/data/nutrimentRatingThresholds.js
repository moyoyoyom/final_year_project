export const nutrimentRatingThresholds = {
  carbohydratePer100g: { goodInHighAmounts: true, low: 10, high: 50 },
  calories: { goodInHighAmounts: false, low: 100, high: 400 },
  fatPer100g: { goodInHighAmounts: false, low: 3, high: 17.5 },
  saturatedFatPer100g: { goodInHighAmounts: false, low: 1.5, high: 6 },
  proteinsPer100g: { goodInHighAmounts: true, low: 5, high: 20 },
  saltPer100g: { goodInHighAmounts: false, low: 0.3, high: 0.6 },
  sodiumPer100g: { goodInHighAmounts: false, low: 0.1, high: 0.6 },
  sugarsPer100g: { goodInHighAmounts: false, low: 5, high: 22.5 },
};

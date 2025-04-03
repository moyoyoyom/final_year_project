import { nutrimentRatingThresholds } from "./data/nutrimentRatingThresholds";

export const classifyNutriments = (nutriments) => {
  return nutriments.map(({ nutriment, amount }) => {
    const nutrimentRatingThreshold = nutrimentRatingThresholds[nutriment];

    if (!nutrimentRatingThreshold) {
      return { nutriment, amount, classification: "Unknown" };
    }
    if (
      amount <= nutrimentRatingThreshold.high &&
      amount >= nutrimentRatingThreshold.low
    ) {
      return { nutriment, amount, classification: "Neutral" };
    }

    const isAmountHealthy = nutrimentRatingThreshold.goodInHighAmounts
      ? amount > nutrimentRatingThreshold.high
      : amount < nutrimentRatingThreshold.low;
    return {
      nutriment,
      amount,
      classification: isAmountHealthy ? "Healthy" : "Unhealthy",
    };
  });
};

export const categoriseNutrimentsList = (nutrimentsList) => {
  const pros = nutrimentsList.filter(
    (nutriment) => nutriment.classification === "Healthy"
  );
  const cons = nutrimentsList.filter(
    (nutriment) =>
      nutriment.classification === "Unhealthy" ||
      nutriment.classification === "Neutral"
  );

  return { pros, cons };
};

import { nutrimentRatingThresholds } from "./data/nutrimentRatingThresholds";

const classifyNutriments = ({ nutriments }) => {
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

export default classifyNutriments;

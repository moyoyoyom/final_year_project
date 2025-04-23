import { ScrollView, StyleSheet } from "react-native";
import RecommendationItem from "./RecommendationItem";

const RecommendationsList = ({ recommendations, onSelect }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollPaneStyle}>
      {recommendations.map((recommendation) => {
        return (
          <RecommendationItem
            key={recommendation.code}
            recommendation={recommendation}
            onSelect={onSelect}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollPaneStyle: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    margin: 10,
    alignSelf: "center",
    paddingBottom: 6600,
  },
});

export default RecommendationsList;

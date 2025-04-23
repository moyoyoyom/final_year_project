import { ScrollView, StyleSheet } from "react-native";
import ResultsItem from "./ResultsItem";

const ResultsList = ({ recommendations, onSelect }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollPaneStyle}>
      {recommendations.map((recommendation) => {
        return (
          <ResultsItem
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

export default ResultsList;

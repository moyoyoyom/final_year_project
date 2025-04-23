import { ScrollView, StyleSheet } from "react-native";
import ResultsItem from "./ResultsItem";

const ResultsList = ({ results, onSelect }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollPaneStyle}>
      {results.map((result) => {
        return (
          <ResultsItem key={result.code} result={result} onSelect={onSelect} />
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
    marginLeft: 18,
  },
});

export default ResultsList;

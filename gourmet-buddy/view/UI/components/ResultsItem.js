import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ResultsItem = ({ result, onSelect }) => {
  //Initialisation
  const imageURL =
    result.image_url === null || result.image_url.trim().length === 0
      ? "https://hadramut.com/_nuxt/img/placeholder.d41418b.jpg"
      : result.image_url;
  const productName = result.product_name;
  const brands = result.brands;

  //Handler
  const handleSelect = () => onSelect(result);

  //View
  return (
    <TouchableOpacity onPress={handleSelect}>
      <View style={styles.itemStyle}>
        <Image source={{ uri: imageURL }} style={styles.imageStyle} />
        <View>
          <Text style={styles.productNameStyle}>{productName}</Text>
          <Text>{brands}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    backgroundColor: "white",
    width: 170,
    height: 240,
    borderRadius: 20,
    margin: 5,
    alignItems: "center",
    paddingTop: 10,
  },
  imageStyle: {
    width: 150,
    height: 120,
    borderRadius: 20,
  },
  productNameStyle: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 500,
  },
});
export default ResultsItem;

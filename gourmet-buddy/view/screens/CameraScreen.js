import { CameraView } from "expo-camera";
import { StyleSheet } from "react-native";
const CameraScreen = ({ onBarcodeScanned }) => {
  return (
    <CameraView
      facing="back"
      onBarcodeScanned={onBarcodeScanned}
      style={styles.flexStyling}
    />
  );
};

const styles = StyleSheet.create({
  flexStyling: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
});

export default CameraScreen;

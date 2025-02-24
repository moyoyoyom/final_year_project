import { CameraView } from "expo-camera";
import { StyleSheet } from "react-native";
import Button from "../UI/components/Button";
import Icons from "../UI/components/Icons";
const CameraScreen = ({ onBarcodeScanned, onExitClick }) => {
  return (
    <CameraView
      facing="back"
      //onBarcodeScanned={onBarcodeScanned}
      style={styles.flexStyling}
    >
      <Button
        buttonIcon={<Icons.ReturnIcon size={30} color={"#0B3007"} />}
        buttonStyle={styles.buttonStyle}
        onClick={onExitClick}
      />
    </CameraView>
  );
};

const styles = StyleSheet.create({
  flexStyling: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  buttonStyle: {
    width: 80,
    height: 80,
    margin: 30,
    backgroundColor: "#FFDC7A",
    borderColor: "#FFDC7A",
  },
});

export default CameraScreen;

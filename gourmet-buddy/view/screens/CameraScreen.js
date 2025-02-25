import { CameraView } from "expo-camera";
import { StyleSheet } from "react-native";
import Button from "../UI/components/Button";
import Icons from "../UI/components/Icons";
const CameraScreen = ({
  onBarcodeScanned,
  onExitClick,
  scanned,
  onSeeResultsClick,
}) => {
  return (
    <CameraView
      facing="back"
      onBarcodeScanned={onBarcodeScanned}
      style={styles.flexStyling}
    >
      <Button
        buttonIcon={<Icons.ReturnIcon size={30} color={"#0B3007"} />}
        buttonStyle={styles.buttonStyle}
        onClick={onExitClick}
      />
      {scanned ? (
        <Button
          buttonText={"See results"}
          onClick={onSeeResultsClick}
          buttonStyle={styles.resultsButtonStyle}
        />
      ) : null}
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
  resultsButtonStyle: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#FFDC7A",
    borderColor: "#FFDC7A",
    width: "80%",
    height: "7%",
    marginBottom: 50,
    alignSelf: "center",
  },
});

export default CameraScreen;

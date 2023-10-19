import { StyleSheet } from "react-native";

import Constants from "../../Constants/Constants";
import {
  scaleHeight,
  scaleSize,
  scaleWidth,
} from "../../Utils/Size/size.utils";

const styles = StyleSheet.create<any>({
  contentWrapper: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
  },
  safeAreaWrapper: {
    flex: 1,
    display: "flex",
    backgroundColor: Constants.Colors.DARK_LIME,
  },
  contentModal: {
    container: {
      margin: "auto",
      width: scaleWidth(330),
      height: scaleHeight(500),
      borderRadius: 5,
      padding: scaleSize(8),
      alignItems: "center",
      backgroundColor: "white",
      paddingVertical: scaleHeight(10),
    },
    title: {
      fontWeight: "700",
      fontSize: scaleSize(15),
      marginBottom: scaleHeight(20),
      color: Constants.Colors.DARK_CHOCOLATE,
    },
    titleInput: {
      borderBottomWidth: scaleSize(0.6),
      borderColor: Constants.Colors.LIGHT_LIME,
      width: "80%",
      padding: scaleSize(8),
      color: Constants.Colors.DARK_CHOCOLATE,
    },
    textAreaInput: {
      alignContent: "center",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      marginTop: scaleHeight(50),
      borderWidth: scaleSize(0.6),
      borderColor: Constants.Colors.LIGHT_LIME,
      width: "80%",
      height: "50%",
      padding: scaleSize(8),
      color: Constants.Colors.DARK_CHOCOLATE,
    },
    buttonWrapper: (isDisable: boolean) => ({
      position: "absolute",
      bottom: scaleHeight(25),
      width: "80%",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      backgroundColor: Constants.Colors.LIGHT_LIME,
      padding: scaleSize(10),
      borderRadius: 8,
      opacity: isDisable ? 0.6 : 1,
    }),
    buttonAdd: {
      borderWidth: 1,
      borderColor: Constants.Colors.DARK_LIME,
      borderRadius: "50%",
      backgroundColor: "white",
      width: scaleSize(50),
      height: scaleSize(50),
      justifyContent: "center",
      alignItems: "center",
      justifyItems: "center",
      position: "absolute",
      bottom: scaleHeight(18),
      zIndex: 1,
      right: scaleWidth(18),
    },
  },
  encryptContainer: {
    top: 0,
    height: scaleHeight(60),
    width: "90%",
    backgroundColor: "white",
    padding: scaleSize(5),
    paddingHorizontal: scaleSize(8),
  },
});

export default styles;

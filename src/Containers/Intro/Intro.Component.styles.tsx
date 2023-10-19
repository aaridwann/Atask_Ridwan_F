import { StyleSheet } from "react-native";

import Constants from "../../Constants/Constants";

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    display: "flex",
    backgroundColor: Constants.Colors.DARK_LIME,
  },
  keyBoardAvoid: { flex: 1 },
  contentWrapper: {
    padding: 4,
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;

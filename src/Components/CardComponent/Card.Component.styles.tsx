import { StyleSheet } from "react-native";

import { scaleHeight, scaleSize, scaleWidth } from "../../Utils/Size/size.utils";

const styles = StyleSheet.create({
  container: {
    marginVertical: scaleHeight(4),
    width: scaleWidth(320),
    minHeight: scaleHeight(65),
    backgroundColor: "white",
    borderRadius: 8,
    padding: scaleSize(8),
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconMarked: {
    position: "absolute",
    top: scaleHeight(-5),
    zIndex: 1,
    right: 0,
  },
  iconEdit: { marginTop: scaleHeight(10), margin: scaleSize(2) },
  toolsWrapper: { flexDirection: "row" },
  iconDelete: { marginTop: scaleHeight(10), margin: scaleSize(2) },
  titleText: { fontWeight: "700" },
  textWrapper: { height: "100%" },
  descriptionText: { marginTop: scaleHeight(5), textAlign: "left" },
});

export default styles;

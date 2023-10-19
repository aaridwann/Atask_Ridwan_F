import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { scaleHeight, scaleSize } from "../../Utils/Size/size.utils";
import styles from "./Card.Component.styles";
import { Props } from "./Card.Component.types";

const ellipsisText = (string: string, limit?: number): string => {
  const limitLength = limit || 100;
  return string.length > limitLength
    ? string.substring(0, limitLength - 3) + "..."
    : string;
};

const _renderDescription = (text: string): React.ReactNode => {
  return <Text style={styles.descriptionText}>{ellipsisText(text, 100)}</Text>;
};

const _renderText = (props: Props) => (
  <View style={styles.textWrapper}>
    <Text
      accessibilityLabel={props.accessibilityLabel}
      style={styles.titleText}
    >
      {props.title}
    </Text>
    {_renderDescription(props.description)}
  </View>
);

const _renderDeleteIcon = (props: Props) => (
  <TouchableOpacity
    accessibilityLabel={`${props.accessibilityLabel}_Delete_Button`}
    onPress={props.onDelete}
  >
    <Ionicons
      style={styles.iconDelete}
      name="trash-outline"
      size={scaleSize(20)}
      color="gray"
    />
  </TouchableOpacity>
);

const _renderEditIcon = (props: Props) => (
  <TouchableOpacity
    accessibilityLabel={`${props.accessibilityLabel}_Edit_Button`}
    onPress={props.onEdit}
  >
    <Ionicons
      style={styles.iconEdit}
      name="pencil-outline"
      size={scaleSize(20)}
      color="gray"
    />
  </TouchableOpacity>
);

const _renderTools = (props: Props): React.ReactNode => (
  <View style={styles.toolsWrapper}>
    {_renderEditIcon(props)}
    {_renderDeleteIcon(props)}
  </View>
);

const _renderMarked = (label: string): React.ReactNode => (
  <Ionicons
    accessibilityLabel={`${label}_Marked_Icon`}
    style={styles.iconMarked}
    name="md-checkmark-circle"
    size={scaleSize(20)}
    color="green"
  />
);

const _renderContent = (props: Props) => (
  <View style={styles.container}>
    {_renderText(props)}
    {_renderTools(props)}
  </View>
);

const CardComponent: React.FC<Props> = (props) => (
  <View style={{ marginVertical: scaleHeight(5) }}>
    {props.isMarked && _renderMarked(props.accessibilityLabel)}
    {_renderContent(props)}
  </View>
);

export default CardComponent;

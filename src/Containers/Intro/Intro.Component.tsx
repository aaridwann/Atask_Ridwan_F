import * as LocalAuthentication from "expo-local-authentication";
import React, { useEffect } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import Constants from "../../Constants/Constants";
import { IntroContainer } from "./Intro.Types";
import Assets from "../../Assets/Assets";
import styles from "./Intro.Component.styles";

const {
  TypeBioMetrics: { FACE_RECOGNIZE, FINGER_PRINT },
} = Constants;

const _renderIcon = (name: any, onPress: VoidFunction, testId: string) => (
  <TouchableOpacity testID={testId} onPress={onPress}>
    <Image source={name} style={{ width: 50, height: 50 }} />
  </TouchableOpacity>
);

const _renderIconWrapper = (supportBiometric, authHandler) => {
  return (
    <View style={{ flexDirection: "row", marginHorizontal: "auto" }}>
      {supportBiometric.includes(FACE_RECOGNIZE) &&
        _renderIcon(
          Assets.Icon.FACE_ID,
          () => authHandler(FACE_RECOGNIZE),
          "FaceIdIcon"
        )}
      {supportBiometric.includes(FINGER_PRINT) &&
        _renderIcon(
          Assets.Icon.FINGER_PRINT,
          () => authHandler(FINGER_PRINT),
          "FingerprintIcon"
        )}
    </View>
  );
};

const _renderTitle = () => (
  <Text style={{ marginVertical: 35, letterSpacing: 2, color: "white" }}>
    Login first
  </Text>
);

const _renderSubTitle = () => (
  <Text style={{ marginVertical: 35, letterSpacing: 2, color: "white" }}>
    Welcome to
  </Text>
);

const CheckHardware = () =>
  LocalAuthentication.supportedAuthenticationTypesAsync()
    .then((res) => res)
    .catch((err) => err);

const HandleBiometric = () =>
  LocalAuthentication.authenticateAsync({
    promptMessage: "Please authenticate first",
    requireConfirmation: true,
    cancelLabel: "Cancel",
    disableDeviceFallback: false,
  })
    .then((success) => success)
    .catch((err) => err);

const IntroComponent = (props: IntroContainer) => {
  const [biometric, setBiometric] = React.useState({
    available: [],
    selected: undefined,
  });
  const selectBiometricHandler = (data: number) =>
    setBiometric((prev) => ({ ...prev, selected: data }));

  const authHandler = async () => {
    const { success, error } = await HandleBiometric();
    if (success) return props.navigation.push("Todos");

    return alert(error);
  };

  useEffect(() => {
    CheckHardware()
      .then((res) => setBiometric((prev) => ({ ...prev, available: res })))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!biometric.selected) return;

    authHandler();
  }, [biometric.selected]);

  return (
    <SafeAreaView style={styles.SafeArea}>
      <KeyboardAvoidingView
        style={styles.keyBoardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.contentWrapper}>
          {_renderIconWrapper(biometric.available, selectBiometricHandler)}
          {_renderTitle()}
          {_renderSubTitle()}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default IntroComponent;

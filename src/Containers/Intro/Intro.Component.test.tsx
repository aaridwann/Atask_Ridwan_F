import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import IntroComponent from "./Intro.Component";
import * as LocalAuthentication from "expo-local-authentication";

jest.mock("expo-local-authentication");

const MockFN = (FN: any) => FN;

describe("IntroComponent", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const Props = {
    isAuth: false,
    navigation: {
      push: jest.fn(),
    },
  };

  it("renders without errors", () => {
    const { getByText } = render(<IntroComponent {...Props} />);

    expect(getByText("Login first")).toBeTruthy();
  });

  it("displays supported biometric authentication methods", async () => {
    MockFN(
      LocalAuthentication.supportedAuthenticationTypesAsync
    ).mockResolvedValue([
      MockFN(LocalAuthentication).Constants.Fingerprint,
      MockFN(LocalAuthentication).Constants.FaceID,
    ]);

    const { getByTestId, debug } = render(<IntroComponent {...Props} />);

    await waitFor(() => {
      const fingerprintIcon = getByTestId("FingerprintIcon");
      const faceIdIcon = getByTestId("FaceIdIcon");

      expect(fingerprintIcon).toBeTruthy();
      expect(faceIdIcon).toBeTruthy();
    });
  });

  it("handles biometric authentication when Fingerprint is selected", async () => {
    MockFN(
      LocalAuthentication.supportedAuthenticationTypesAsync
    ).mockResolvedValue([MockFN(LocalAuthentication).Constants.Fingerprint]);

    const { getByTestId } = render(<IntroComponent {...Props} />);
    await waitFor(() => {
      const fingerprintIcon = getByTestId("FingerprintIcon");

      fireEvent.press(fingerprintIcon);

      expect(LocalAuthentication.authenticateAsync).toHaveBeenCalledWith({
        promptMessage: "Please authenticate first",
        requireConfirmation: true,
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
      });
    });
  });

  it("handles biometric authentication when Face ID is selected", async () => {
    MockFN(
      LocalAuthentication.supportedAuthenticationTypesAsync
    ).mockResolvedValue([MockFN(LocalAuthentication).Constants.FaceID]);

    const { getByTestId } = render(<IntroComponent {...Props} />);

    await waitFor(() => {
      const faceIdIcon = getByTestId("FaceIdIcon");

      fireEvent.press(faceIdIcon);

      expect(LocalAuthentication.authenticateAsync).toHaveBeenCalledWith({
        promptMessage: "Please authenticate first",
        requireConfirmation: true,
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
      });
    });
  });
});

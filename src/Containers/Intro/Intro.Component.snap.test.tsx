import * as React from "react";
import { render, waitFor } from "@testing-library/react-native";

import IntroComponent from "./Intro.Component";

jest.mock("expo-local-authentication");

describe("Snap test", () => {
  const mockValue = {
    available: [0, 1, 2],
    selected: 2,
  };

  const Props = {
    isAuth: false,
    navigation: {
      push: jest.fn(),
    },
  };

  it("Should render with correct props", async () => {
    jest
      .spyOn(React, "useState")
      .mockImplementation(() => [mockValue, jest.fn()]);

    await waitFor(() => {
      expect(render(<IntroComponent {...Props} />)).toMatchSnapshot();
    });
  });
});

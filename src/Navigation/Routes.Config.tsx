import React from "react";

import IntroContainers from "../Containers/Intro/Intro.Containers";
import TodoContainers from "../Containers/Todos/Todos.Container";

interface ScreenConfigType {
  name: string;
  component: React.FC<any>;
  navigationOptions?: {
    headerShown?: boolean;
    headerTitle?: string;
    backButton?: boolean;
  };
}

const screenConfig: Array<ScreenConfigType> = [
  {
    name: "Intro",
    component: IntroContainers,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: "Todos",
    component: TodoContainers,
    navigationOptions: {
      headerShown: false,
    },
  },
];

export default screenConfig;

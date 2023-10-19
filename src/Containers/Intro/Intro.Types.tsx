interface Navigation {
  push: (name: string) => void;
}

export interface IntroContainer {
  navigation: Navigation;
  isAuth: boolean;
}

export type VoidFunction = () => void;

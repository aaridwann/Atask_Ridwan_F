interface Navigation {
  push: (name: string) => void;
}

export interface IntroContainer {
  navigation: Navigation;
  isAuth: boolean;
  setLogin: (params: any) => void;
}

export type VoidFunction = () => void;

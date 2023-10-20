export interface PayloadNoteType {
  id: string | number[];
  title: string;
  description: string;
  isMarked: boolean;
}

export interface Props {
  navigation: {
    push: (name: string) => void;
  };
  addNote: (payload: PayloadNoteType) => void;
  deleteNote: (payload: string | number[]) => void;
  editNote: (payload: PayloadNoteType) => void;
  notes: PayloadNoteType[];
}

export interface GetModalProps {
  animationInTiming: number;
  animationOutTiming: number;
  animationIn: string;
  useNativeDriver: boolean;
  avoidKeyboard: boolean;
  isVisible: boolean;
  backdropOpacity: number;
  onBackButtonPress: VoidFunction;
  onBackdropPress: VoidFunction;
}

export type OnSave = (payload: PayloadNoteType) => void;
export type OnDelete = (id: string | number[]) => void;
export type OnEdit = (payload: PayloadNoteType) => void;
export type GetEncrypt = VoidFunction;
export type Dispatch = (reducer: any) => void;
export type State = {
  notes: Array<any>;
  authentication: { isAuth: boolean };
};

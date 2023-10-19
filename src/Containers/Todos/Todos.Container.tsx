import React from "react";
import { connect } from "react-redux";

import TodoComponent from "./Todos.Component";
import { PayloadNoteType, Props } from "./Todos.Types";
import {
  ADD_NOTE,
  EDIT_NOTE,
  REMOVE_NOTE,
} from "../../Redux/Slice/Notes/Notes.slice";
type Dispatch = (reducer: any) => void;
type State = {
  notes: Array<any>;
};

const TodoContainers = (props: Props) => <TodoComponent {...props} />;

const mapStateToProps = (state: State) => ({
  ...state.notes,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addNote: (payload: PayloadNoteType) => dispatch(ADD_NOTE(payload)),
  deleteNote: (payload: string) => dispatch(REMOVE_NOTE(payload)),
  editNote: (payload: PayloadNoteType) => dispatch(EDIT_NOTE(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainers);
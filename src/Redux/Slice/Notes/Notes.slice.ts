import { createSlice } from '@reduxjs/toolkit';

interface NotesType {
  id: string;
  title: string;
  description: string;
  isMarked: boolean;
}

interface AuthenticationState {
  notes: NotesType[];
}

const initialState: AuthenticationState = {
	notes: [],
};

const notesSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		ADD_NOTE: (state, action) => {
			state.notes.push(action.payload);
		},
		EDIT_NOTE: (state, action) => {
			const { id, description, title } = action.payload;
			const noteToEdit = state.notes.find(note => note.id === id);
			if (noteToEdit) {
				noteToEdit.description = description;
				noteToEdit.title = title;
			}
		},
		REMOVE_NOTE: (state, action) => {
			const idToRemove = action.payload;
			state.notes = state.notes.filter(note => note.id !== idToRemove);
		},
	},
});

export const { ADD_NOTE, EDIT_NOTE, REMOVE_NOTE } = notesSlice.actions;
export default notesSlice.reducer;

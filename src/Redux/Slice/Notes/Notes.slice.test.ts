import notesReducer, { ADD_NOTE, EDIT_NOTE, REMOVE_NOTE } from "./Notes.slice";

const initialState = {
  notes: [],
};

describe("notes slice", () => {
  it("should handle ADD_NOTE", () => {
    const newNote = {
      id: "1",
      title: "Test Note",
      description: "This is a test note",
      isMarked: false,
    };

    const action = {
      type: ADD_NOTE.type,
      payload: newNote,
    };

    const newState = notesReducer(initialState, action);

    expect(newState.notes).toEqual([newNote]);
  });

  it("should handle EDIT_NOTE", () => {
    const initialStateWithNote = {
      notes: [
        {
          id: "1",
          title: "Test Note",
          description: "This is a test note",
          isMarked: false,
        },
      ],
    };

    const editedNote = {
      id: "1",
      title: "Updated Note",
      description: "This is an updated note",
      isMarked: false,
    };

    const action = {
      type: EDIT_NOTE.type,
      payload: editedNote,
    };

    const newState = notesReducer(initialStateWithNote, action);

    expect(newState.notes).toEqual([editedNote]);
  });

  it("should handle REMOVE_NOTE", () => {
    const initialStateWithNotes = {
      notes: [
        {
          id: "1",
          title: "Test Note 1",
          description: "This is a test note",
          isMarked: false,
        },
        {
          id: "2",
          title: "Test Note 2",
          description: "This is another test note",
          isMarked: false,
        },
      ],
    };

    const noteIdToRemove = "1";

    const action = {
      type: REMOVE_NOTE.type,
      payload: noteIdToRemove,
    };

    const newState = notesReducer(initialStateWithNotes, action);

    expect(newState.notes).toEqual([
      {
        id: "2",
        title: "Test Note 2",
        description: "This is another test note",
        isMarked: false,
      },
    ]);
  });
});

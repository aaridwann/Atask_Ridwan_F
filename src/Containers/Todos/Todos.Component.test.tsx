import { render, waitFor, fireEvent } from "@testing-library/react-native";

import TodoComponent from "./Todos.Component";

import type { Props } from "./Todos.Types";

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

jest
  .mock("@expo/vector-icons/Ionicons", () => "Ionicons")
  .mock("@react-native-async-storage/async-storage", () => {
    return jest.fn().mockReturnValue({ notes: [1, 2, 3] });
  })
  .mock("../../Utils/CollectData/collectData", () =>
    jest.fn().mockResolvedValue({ notes: [1, 2, 3] })
  );

describe("Todo Compoennt", () => {
  const mockNotes = [
    {
      id: "001",
      title: "title 1",
      description: "description 1",
      isMarked: false,
    },
    {
      id: "002",
      title: "title 2",
      description: "description 2",
      isMarked: false,
    },
  ];
  const Props: Props = {
    navigation: {
      push: jest.fn(),
    },
    addNote: jest.fn(),
    editNote: jest.fn(),
    deleteNote: jest.fn(),
    notes: mockNotes,
  };

  it("SnapTesting", async () => {
    let wrapper = render(<TodoComponent {...Props} />);

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("Should render modal while add button pressed", async () => {
    const { getByTestId, debug } = render(<TodoComponent {...Props} />);

    const modal = getByTestId("Modal");
    const addButton = getByTestId("Add_Button");

    await waitFor(() => {
      expect(modal.props.visible).toBe(false);
    });

    fireEvent.press(addButton);

    await waitFor(() => {
      expect(modal.props.visible).toBe(true);
      expect(modal).toBeDefined();
    });
  });

  describe("Add Notes", () => {
    it("Should call Add note while save button is pressed", async () => {
      const { getByTestId } = render(<TodoComponent {...Props} />);
      const expectedPayloadSave = {
        description: "Input description satu",
        id: expect.any(String),
        isMarked: false,
        title: "Input title satu",
      };
      fireEvent.press(getByTestId("Add_Button"));

      const titleInput = getByTestId("Title_Input");
      const descriptionInput = getByTestId("Description_Input");

      await waitFor(() => {
        fireEvent.changeText(titleInput, "Input title satu");
        fireEvent.changeText(descriptionInput, "Input description satu");
      });

      await waitFor(() => {
        expect(titleInput.props.value).toBe("Input title satu");
        expect(descriptionInput.props.value).toBe("Input description satu");
      });

      await waitFor(() => fireEvent.press(getByTestId("Save_Button")));

      await waitFor(() =>
        expect(Props.addNote).toHaveBeenCalledWith(expectedPayloadSave)
      );
    });
  });

  describe("Delete Notes", () => {
    it("Should call delete while delete button isPressed", async () => {
      const { getAllByLabelText } = render(<TodoComponent {...Props} />);

      await waitFor(() =>
        fireEvent.press(getAllByLabelText("Note_001_Delete_Button")[0])
      );

      await waitFor(() => expect(Props.deleteNote).toHaveBeenCalledWith("001"));
    });
  });

  describe("Edit Notes", () => {
    it("Should call filled input while edit button is pressed", async () => {
      const { getByLabelText, getByTestId } = render(
        <TodoComponent {...Props} />
      );

      /** Simulate Edit button is pressed */
      await waitFor(() =>
        fireEvent.press(getByLabelText("Note_002_Edit_Button"))
      );

      /** Modal is Showed */
      await waitFor(() =>
        expect(getByTestId("Modal").props.visible).toBe(true)
      );

      const titleInput = getByTestId("Title_Input");
      const descriptionInput = getByTestId("Description_Input");

      /** Refill input with value is gonna be edit */
      await waitFor(() => {
        expect(titleInput.props.value).toBe("title 2");
        expect(descriptionInput.props.value).toBe("description 2");
      });

      /** Simulate retype the input */
      await waitFor(() => {
        fireEvent.changeText(titleInput, "title 3");
        fireEvent.changeText(descriptionInput, "description 3");
      });

      await waitFor(() => {
        expect(titleInput.props.value).toBe("title 3");
        expect(descriptionInput.props.value).toBe("description 3");
      });

      /** Simulate Press Edit button */
      await waitFor(() => fireEvent.press(getByTestId("Save_Button")));

      await waitFor(() =>
        expect(Props.editNote).toHaveBeenCalledWith({
          id: "002",
          title: "title 3",
          description: "description 3",
          isMarked: false,
        })
      );
    });
  });
});

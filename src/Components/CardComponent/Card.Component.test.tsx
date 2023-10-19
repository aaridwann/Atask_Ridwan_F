import { render, fireEvent } from "@testing-library/react-native";

import CardComponent from "./Card.Component";
import { Props } from "./Card.Component.types";

jest.mock("@expo/vector-icons/Ionicons", () => "Ionicons");

beforeEach(() => jest.clearAllMocks());

describe("CardComponent", () => {
  const mockEdit = jest.fn();
  const mockDelete = jest.fn();
  const MockProps: Props = {
    title: "title",
    description: "description",
    onEdit: mockEdit,
    onDelete: mockDelete,
    accessibilityLabel: "notes",
  };

  describe("Snap test", () => {
    it("Should render with correct value", () => {
      const wrapper = render(<CardComponent {...MockProps} />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("Should correct value according a props", () => {
    const { getByText, getAllByLabelText } = render(
      <CardComponent {...MockProps} />
    );
    const editButton = getAllByLabelText(
      `${MockProps.accessibilityLabel}_Edit_Button`
    );
    const deleteButton = getAllByLabelText(
      `${MockProps.accessibilityLabel}_Delete_Button`
    );

    expect(getByText(MockProps.title)).toBeTruthy();
    expect(getByText(MockProps.description)).toBeTruthy();
    expect(editButton).toBeTruthy();
    expect(deleteButton).toBeTruthy();
  });

  it("Should call Edit button while edit button is pressed", () => {
    const { getAllByLabelText } = render(<CardComponent {...MockProps} />);

    const editButton = getAllByLabelText(
      `${MockProps.accessibilityLabel}_Edit_Button`
    );

    fireEvent.press(editButton[0]);

    expect(MockProps.onDelete).not.toHaveBeenCalled();
    expect(MockProps.onEdit).toHaveBeenCalled();
  });

  it("Should call Edit button while edit button is pressed", () => {
    const { getAllByLabelText } = render(<CardComponent {...MockProps} />);

    const deleteButton = getAllByLabelText(
      `${MockProps.accessibilityLabel}_Delete_Button`
    );

    fireEvent.press(deleteButton[0]);

    expect(MockProps.onDelete).toHaveBeenCalled();
    expect(MockProps.onEdit).not.toHaveBeenCalled();
  });

  it("Should render Marked icon while data is Marked", () => {
    const newProps = {
      ...MockProps,
      isMarked: true,
    };
    const { getByLabelText } = render(<CardComponent {...newProps} />);

    const markedIcon = getByLabelText(
      `${MockProps.accessibilityLabel}_Marked_Icon`
    );

    expect(markedIcon).toBeTruthy();
  });
});

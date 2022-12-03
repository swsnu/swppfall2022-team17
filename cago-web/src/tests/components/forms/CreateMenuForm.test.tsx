import userEvent from "@testing-library/user-event";
import CreateMenuForm from "components/forms/CreateMenuForm";
import { act } from "react-dom/test-utils";
import { render, screen } from "tests/utils";

describe("create menu form", () => {
  it("handles creating a menu", async () => {
    const onSuccess = jest.fn();

    await act(() => {
      render(<CreateMenuForm cafeId={1} onSuccess={onSuccess} />);
    });

    const nameInput = screen.getByPlaceholderText(/이름/);
    const categoryInput = screen.getByPlaceholderText(/카테고리/);
    const priceInput = screen.getByPlaceholderText(/가격/);
    const checkbox = screen.getByRole("checkbox");

    await userEvent.type(nameInput, "카라멜 마키야토");
    await userEvent.type(categoryInput, "커피");
    await userEvent.type(priceInput, "7000");
    await userEvent.click(checkbox);

    const button = screen.getByRole("button", { name: /추가하기/ });
    await userEvent.click(button);
    expect(onSuccess).toBeCalledTimes(1);
  });
});

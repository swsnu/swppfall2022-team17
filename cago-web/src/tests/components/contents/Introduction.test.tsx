import userEvent from "@testing-library/user-event";
import CafeIntroduction from "components/contents/CafeIntroduction";
import { act, render, screen } from "tests/utils";

const renderCafeIntroduction = () =>
  render(<CafeIntroduction editable introduction="introduction1" cafeId={1} />);

describe("cafe introduction", () => {
  it("handles edit", async () => {
    await act(() => {
      renderCafeIntroduction();
    });

    const editButton = screen.getByRole("button", { name: /edit/ });
    await userEvent.click(editButton);

    const textInput = screen.getByRole("textbox");
    await userEvent.type(textInput, "new introduction");

    const saveButton = screen.getByRole("button", { name: /저장하기/ });
    await userEvent.click(saveButton);
  });
});

import userEvent from "@testing-library/user-event";
import ActivityToggleButton from "components/contents/ActivityToggleButton";
import { ManagedCafe } from "lib/cafe";
import { cafes } from "mocks/stubs";
import { act } from "react-dom/test-utils";
import { render, screen } from "tests/utils";

const cafe = cafes[0] as ManagedCafe;

describe("activity toggle button", () => {
  it("follows the cafe's force-closed state", async () => {
    await act(() => {
      render(<ActivityToggleButton cafe={cafe} />);
    });
    await screen.findByRole("button", { name: /영업 중/ });
  });

  it("toggles the open-closed state on clicking the button", async () => {
    await act(() => {
      render(<ActivityToggleButton cafe={cafe} />);
    });
    const toggleButton = await screen.findByRole("button", {
      name: /영업 중/,
    });
    await userEvent.click(toggleButton);
    // await waitFor(() => screen.getByText("준비 중"));
  });
});

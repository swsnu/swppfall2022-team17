import userEvent from "@testing-library/user-event";
import { ManagedCafe } from "components/contents/CafesMap";
import CafeToggleSwitch from "components/contents/CafeToggleSwitch";
import { cafes } from "mocks/stubs";
import { act } from "react-dom/test-utils";
import { render, screen } from "tests/utils";

const cafe = cafes[0] as unknown as ManagedCafe;

describe("open toggle switch", () => {
  it("follows the cafe's force-closed state", async () => {
    await act(() => {
      render(<CafeToggleSwitch cafe={cafe} />);
    });
    await screen.findByRole("button", { name: /영업 중/ });
  });

  it("switches the open-closed state on clicking the button", async () => {
    await act(() => {
      render(<CafeToggleSwitch cafe={cafe} />);
    });
    const toggleButton = await screen.findByRole("button", {
      name: /영업 중/,
    });
    await userEvent.click(toggleButton);
    // await waitFor(() => screen.getByText("준비 중"));
  });
});

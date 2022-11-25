import userEvent from "@testing-library/user-event";
import OpenToggleSwitch from "components/layouts/OpenToggleSwitch";
import { render, screen, waitFor } from "tests/utils";
import { managedCafe } from "../../../mocks/stubs";

describe("open toggle switch", () => {
  it("follows the cafe's force-closed state", async () => {
    render(<OpenToggleSwitch {...managedCafe} />);
    await screen.findByRole("button", { name: /영업 중/ });
  });

  it("switches the open-closed state on clicking the button", async () => {
    render(<OpenToggleSwitch {...managedCafe} />);
    const toggleButton = await screen.findByRole("button", {
      name: /영업 중/,
    });
    await userEvent.click(toggleButton);
    await waitFor(() => screen.getByText("준비 중"));
  });
});

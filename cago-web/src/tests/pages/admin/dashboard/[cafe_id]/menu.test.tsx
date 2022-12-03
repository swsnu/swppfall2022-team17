import userEvent from "@testing-library/user-event";
import DashboardMenu from "pages/admin/dashboard/[cafe_id]/menu";
import { act, render, screen } from "tests/utils";

describe("admin dashboard menu page", () => {
  it("renders", async () => {
    await act(() => {
      render(<DashboardMenu />);
    });
  });

  it("displays add menu button", async () => {
    await act(() => {
      render(<DashboardMenu />);
    });
    const button = await screen.findByRole("button", { name: /추가하기/ });
    await userEvent.click(button); // open modal
    screen.getByPlaceholderText(/메뉴 이름/);
    await userEvent.click(await screen.findByTestId(/modal-overlay/)); // close modal
  });
});

import CafeMenu from "pages/cafes/[cafe_id]/menu";
import { act, render, screen } from "tests/utils";

describe("cafe menu page", () => {
  it("renders", async () => {
    await act(() => {
      render(<CafeMenu />);
    });
  });

  it("displays main menu", async () => {
    await act(() => {
      render(<CafeMenu />);
    });
    expect(await screen.findByText(/대표 메뉴/)).toBeVisible();
  });
});

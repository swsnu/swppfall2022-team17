import Info from "pages/cafes/[cafe_id]/info";
import { act, render } from "tests/utils";

describe("cafe info page", () => {
  it("renders", async () => {
    await act(() => {
      render(<Info />);
    });
  });
});

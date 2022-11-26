import Info from "pages/cafes/[id]/info";
import { act, render } from "tests/utils";

describe("cafe information page", () => {
  it("renders", async () => {
    await act(() => {
      render(<Info />);
    });
  });
});

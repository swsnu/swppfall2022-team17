import Board from "pages/cafes/[cafe_id]/board";
import { act, render } from "tests/utils";

describe("cafe board page", () => {
  it("renders", async () => {
    await act(() => {
      render(<Board />);
    });
  });
});

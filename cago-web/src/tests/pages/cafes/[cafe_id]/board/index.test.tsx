import Board from "pages/cafes/[cafe_id]/board/index";
import { render, act } from "tests/utils";

describe("cafe board page", () => {
  it("renders", async () => {
    await act(() => {
      render(<Board />);
    });
  });
});
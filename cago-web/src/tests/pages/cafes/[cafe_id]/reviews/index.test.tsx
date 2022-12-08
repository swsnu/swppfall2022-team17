import Reviews from "pages/cafes/[cafe_id]/reviews";
import { act, render } from "tests/utils";

describe("cafe review page", () => {
  it("renders", async () => {
    await act(() => {
      render(<Reviews />);
    });
  });
});

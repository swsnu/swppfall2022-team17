import ReviewsCreate from "pages/cafes/[cafe_id]/reviews/create";
import { act, render } from "tests/utils";

describe("cafe review create page", () => {
  it("renders", async () => {
    await act(() => {
      render(<ReviewsCreate />);
    });
  });
});

import CreateReviewForm from "components/forms/CreateReviewForm";
import { act, render } from "tests/utils";

describe("create review form", () => {
  it("renders", async () => {
    await act(() => {
      render(<CreateReviewForm cafe_id={1} />);
    });
  });
});

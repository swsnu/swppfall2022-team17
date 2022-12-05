import PostArticle from "pages/admin/dashboard/[cafe_id]/board/post";
import { render, act } from "tests/utils";

describe("post article page", () => {
  it("renders", async () => {
    await act(() => {
      render(<PostArticle />);
    });
  });
});
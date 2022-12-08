import CommentsList from "components/contents/CommentsList";
import { comments } from "mocks/stubs";
import { act, render } from "tests/utils";

describe("comments list", () => {
  it("renders", async () => {
    await act(() => {
      render(<CommentsList cafe_id={1} article_id={1} comments={comments} />);
    });
  });
});
